using System.Text;
using System.Text.Json;
using Devliora.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Devliora.Infrastructure.Telegram;

public class TelegramApiClient : ITelegramApiClient
{
    private readonly HttpClient _httpClient;
    private readonly TelegramAssistantSettings _settings;
    private readonly ILogger<TelegramApiClient> _logger;

    public TelegramApiClient(
        HttpClient httpClient,
        IOptions<TelegramAssistantSettings> settings,
        ILogger<TelegramApiClient> logger)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task SendMessageAsync(long chatId, string text, CancellationToken cancellationToken = default)
    {
        var url = $"https://api.telegram.org/bot{_settings.BotToken}/sendMessage";

        var requestBody = new
        {
            chat_id = chatId,
            text
        };

        var json = JsonSerializer.Serialize(requestBody);
        using var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync(url, content, cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                // Never log the bot token; it is only present in the request URL, not in this body.
                _logger.LogError("Telegram sendMessage returned {StatusCode}: {Body}", response.StatusCode, errorBody);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Telegram sendMessage call failed for chat {ChatId}", chatId);
        }
    }

    public async Task SendMessageWithButtonsAsync(
        long chatId,
        string text,
        IReadOnlyList<(string Label, string CallbackData)> buttons,
        CancellationToken cancellationToken = default)
    {
        var url = $"https://api.telegram.org/bot{_settings.BotToken}/sendMessage";

        // Telegram expects inline_keyboard as an array of rows; put one button per row for readability.
        var inlineKeyboard = buttons
            .Select(b => new[] { new { text = b.Label, callback_data = b.CallbackData } })
            .ToArray();

        var requestBody = new
        {
            chat_id = chatId,
            text,
            reply_markup = new
            {
                inline_keyboard = inlineKeyboard
            }
        };

        var json = JsonSerializer.Serialize(requestBody);
        using var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync(url, content, cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogError("Telegram sendMessage (with buttons) returned {StatusCode}: {Body}", response.StatusCode, errorBody);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Telegram sendMessage (with buttons) call failed for chat {ChatId}", chatId);
        }
    }

    public async Task AnswerCallbackQueryAsync(string callbackQueryId, CancellationToken cancellationToken = default)
    {
        var url = $"https://api.telegram.org/bot{_settings.BotToken}/answerCallbackQuery";

        var requestBody = new
        {
            callback_query_id = callbackQueryId
        };

        var json = JsonSerializer.Serialize(requestBody);
        using var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync(url, content, cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogError("Telegram answerCallbackQuery returned {StatusCode}: {Body}", response.StatusCode, errorBody);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Telegram answerCallbackQuery call failed for callback {CallbackQueryId}", callbackQueryId);
        }
    }
}
