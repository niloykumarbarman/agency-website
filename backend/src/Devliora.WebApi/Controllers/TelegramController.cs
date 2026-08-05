using System.Text.Json;
using Devliora.Application.Common.Interfaces;
using Devliora.Application.Features.Telegram.Commands.ProcessUpdate;
using Devliora.Infrastructure.Telegram;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Devliora.WebApi.Controllers;

[ApiController]
[Route("api/telegram")]
public class TelegramController : ControllerBase
{
    private readonly ISender _sender;
    private readonly ITelegramApiClient _apiClient;
    private readonly ITelegramSessionStore _sessionStore;
    private readonly TelegramAssistantSettings _settings;
    private readonly ILogger<TelegramController> _logger;
    private const string SecretTokenHeader = "X-Telegram-Bot-Api-Secret-Token";
    private const string StartCommand = "/start";

    public TelegramController(
        ISender sender,
        ITelegramApiClient apiClient,
        ITelegramSessionStore sessionStore,
        IOptions<TelegramAssistantSettings> settings,
        ILogger<TelegramController> logger)
    {
        _sender = sender;
        _apiClient = apiClient;
        _sessionStore = sessionStore;
        _settings = settings.Value;
        _logger = logger;
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> Webhook([FromBody] JsonElement body, CancellationToken cancellationToken)
    {
        if (!Request.Headers.TryGetValue(SecretTokenHeader, out var providedToken)
            || providedToken != _settings.WebhookSecretToken)
        {
            _logger.LogWarning("Telegram webhook called with missing or invalid secret token");
            return Unauthorized();
        }

        if (TryExtractCallbackQuery(body, out var callbackQueryId, out var callbackChatId, out var callbackData))
        {
            await HandleCallbackQueryAsync(callbackQueryId, callbackChatId, callbackData, cancellationToken);
            return Ok();
        }

        if (!TryExtractTextMessage(body, out var chatId, out var text))
        {
            // Non-text messages (photos, stickers, etc.) are not yet supported.
            // Acknowledge with 200 so Telegram does not retry.
            return Ok();
        }

        if (text.Trim() == StartCommand)
        {
            await HandleStartCommandAsync(chatId, cancellationToken);
            return Ok();
        }

        await _sender.Send(new ProcessTelegramUpdateCommand(chatId, text), cancellationToken);

        return Ok();
    }

    private async Task HandleStartCommandAsync(long chatId, CancellationToken cancellationToken)
    {
        // Start each /start with a clean slate so the conversation history doesn't carry over.
        await _sessionStore.ClearAsync(chatId, cancellationToken);

        var buttons = TelegramWelcomeMessage.SuggestedQuestions
            .Select((q, index) => (Label: q.Label, CallbackData: $"q{index}"))
            .ToList();

        await _apiClient.SendMessageWithButtonsAsync(chatId, TelegramWelcomeMessage.Text, buttons, cancellationToken);
    }

    private async Task HandleCallbackQueryAsync(
        string callbackQueryId,
        long chatId,
        string callbackData,
        CancellationToken cancellationToken)
    {
        // Always acknowledge the callback so Telegram clears the button's loading spinner,
        // even if the data doesn't map to a known question.
        await _apiClient.AnswerCallbackQueryAsync(callbackQueryId, cancellationToken);

        if (!callbackData.StartsWith('q')
            || !int.TryParse(callbackData.AsSpan(1), out var index)
            || index < 0
            || index >= TelegramWelcomeMessage.SuggestedQuestions.Count)
        {
            _logger.LogWarning("Telegram callback_query with unrecognized data: {CallbackData}", callbackData);
            return;
        }

        var question = TelegramWelcomeMessage.SuggestedQuestions[index].Question;
        await _sender.Send(new ProcessTelegramUpdateCommand(chatId, question), cancellationToken);
    }

    private static bool TryExtractTextMessage(JsonElement body, out long chatId, out string text)
    {
        chatId = 0;
        text = string.Empty;

        if (!body.TryGetProperty("message", out var message))
        {
            return false;
        }

        if (!message.TryGetProperty("text", out var textElement) || textElement.ValueKind != JsonValueKind.String)
        {
            return false;
        }

        if (!message.TryGetProperty("chat", out var chat) || !chat.TryGetProperty("id", out var chatIdElement))
        {
            return false;
        }

        var textValue = textElement.GetString();
        if (string.IsNullOrWhiteSpace(textValue))
        {
            return false;
        }

        chatId = chatIdElement.GetInt64();
        text = textValue;
        return true;
    }

    private static bool TryExtractCallbackQuery(
        JsonElement body,
        out string callbackQueryId,
        out long chatId,
        out string callbackData)
    {
        callbackQueryId = string.Empty;
        chatId = 0;
        callbackData = string.Empty;

        if (!body.TryGetProperty("callback_query", out var callbackQuery))
        {
            return false;
        }

        if (!callbackQuery.TryGetProperty("id", out var idElement) || idElement.ValueKind != JsonValueKind.String)
        {
            return false;
        }

        if (!callbackQuery.TryGetProperty("data", out var dataElement) || dataElement.ValueKind != JsonValueKind.String)
        {
            return false;
        }

        if (!callbackQuery.TryGetProperty("message", out var message)
            || !message.TryGetProperty("chat", out var chat)
            || !chat.TryGetProperty("id", out var chatIdElement))
        {
            return false;
        }

        callbackQueryId = idElement.GetString() ?? string.Empty;
        callbackData = dataElement.GetString() ?? string.Empty;
        chatId = chatIdElement.GetInt64();

        return !string.IsNullOrEmpty(callbackQueryId) && !string.IsNullOrEmpty(callbackData);
    }
}
