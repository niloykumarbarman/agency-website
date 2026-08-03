using System.Text;
using System.Text.Json;
using Devliora.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Devliora.Infrastructure.Assistant;

// Simple wrapper class so it satisfies ICacheService's `where T : class` constraint.
public class QuotaCounter
{
    public int Count { get; set; }
}

public class GeminiChatService : IAssistantChatService
{
    private readonly HttpClient _httpClient;
    private readonly ICacheService _cacheService;
    private readonly AssistantSettings _settings;
    private readonly ILogger<GeminiChatService> _logger;
    private const string FallbackErrorMessage = "Sorry, the assistant is unavailable right now. Please try again shortly.";
    private const string QuotaExceededMessage = "Sorry, the assistant has reached its usage limit for today. Please try again tomorrow, or use the contact form below.";
    private const string QuotaKeyPrefix = "assistant:daily-quota:";

    public GeminiChatService(
        HttpClient httpClient,
        ICacheService cacheService,
        IOptions<AssistantSettings> settings,
        ILogger<GeminiChatService> logger)
    {
        _httpClient = httpClient;
        _cacheService = cacheService;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<string> GetReplyAsync(List<ChatTurn> history, CancellationToken cancellationToken)
    {
        var quotaKey = $"{QuotaKeyPrefix}{DateTime.UtcNow:yyyy-MM-dd}";

        var counter = await _cacheService.GetAsync<QuotaCounter>(quotaKey, cancellationToken);
        if (counter is not null && counter.Count >= _settings.GeminiDailyQuota)
        {
            _logger.LogWarning("Assistant daily quota reached ({Count}/{Quota})", counter.Count, _settings.GeminiDailyQuota);
            return QuotaExceededMessage;
        }

        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_settings.GeminiModel}:generateContent?key={_settings.GeminiApiKey}";

        var contents = history
            .Where(t => t.Role is "user" or "model")
            .Select(t => new
            {
                role = t.Role,
                parts = new[] { new { text = t.Content } }
            });

        var requestBody = new
        {
            system_instruction = new
            {
                parts = new[] { new { text = AssistantSystemPrompt.Text } }
            },
            contents
        };

        var json = JsonSerializer.Serialize(requestBody);
        using var content = new StringContent(json, Encoding.UTF8, "application/json");

        HttpResponseMessage response;
        try
        {
            response = await _httpClient.PostAsync(url, content, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Gemini API call failed");
            return FallbackErrorMessage;
        }

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
            _logger.LogError("Gemini API returned {StatusCode}: {Body}", response.StatusCode, errorBody);
            return FallbackErrorMessage;
        }

        var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
        using var doc = JsonDocument.Parse(responseJson);

        string replyText;
        try
        {
            var text = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            replyText = text ?? FallbackErrorMessage;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to parse Gemini response: {Body}", responseJson);
            return FallbackErrorMessage;
        }

        // Only count successful Gemini calls toward the daily quota.
        await IncrementQuotaAsync(quotaKey, counter, cancellationToken);

        return replyText;
    }

    private async Task IncrementQuotaAsync(string quotaKey, QuotaCounter? counter, CancellationToken cancellationToken)
    {
        var newCount = (counter?.Count ?? 0) + 1;
        var nextUtcMidnight = DateTime.UtcNow.Date.AddDays(1);
        var expiry = nextUtcMidnight - DateTime.UtcNow;

        try
        {
            await _cacheService.SetAsync(quotaKey, new QuotaCounter { Count = newCount }, expiry, cancellationToken);
        }
        catch (Exception ex)
        {
            // Quota tracking is best-effort; never fail the chat request because of it.
            _logger.LogWarning(ex, "Failed to update assistant daily quota counter");
        }
    }
}
