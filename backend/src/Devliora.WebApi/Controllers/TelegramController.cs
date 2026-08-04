using System.Text.Json;
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
    private readonly TelegramAssistantSettings _settings;
    private readonly ILogger<TelegramController> _logger;
    private const string SecretTokenHeader = "X-Telegram-Bot-Api-Secret-Token";

    public TelegramController(
        ISender sender,
        IOptions<TelegramAssistantSettings> settings,
        ILogger<TelegramController> logger)
    {
        _sender = sender;
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

        if (!TryExtractTextMessage(body, out var chatId, out var text))
        {
            // Non-text messages (photos, stickers, commands other than plain text, etc.)
            // are not yet supported. Acknowledge with 200 so Telegram does not retry.
            return Ok();
        }

        await _sender.Send(new ProcessTelegramUpdateCommand(chatId, text), cancellationToken);

        return Ok();
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
}
