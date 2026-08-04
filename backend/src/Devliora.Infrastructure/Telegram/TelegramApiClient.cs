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
}
