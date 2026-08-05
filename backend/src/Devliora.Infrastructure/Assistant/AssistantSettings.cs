namespace Devliora.Infrastructure.Assistant;

public class AssistantSettings
{
    public string GeminiApiKey { get; set; } = string.Empty;
    public string GeminiModel { get; set; } = "gemini-3.6-flash";

    // Soft daily quota guard. Gemini 3.6 Flash free-tier RPD is 20 for the whole
    // Google Cloud project, shared between this widget and the Telegram bot
    // (confirmed via Google AI Studio dashboard). Split with headroom: 8 + 8 = 16,
    // leaving 4 as buffer. Raise once billing/Tier 1 is enabled.
    public int GeminiDailyQuota { get; set; } = 8;
}
