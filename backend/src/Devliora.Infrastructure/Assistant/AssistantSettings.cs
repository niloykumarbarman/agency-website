namespace Devliora.Infrastructure.Assistant;

public class AssistantSettings
{
    public string GeminiApiKey { get; set; } = string.Empty;
    public string GeminiModel { get; set; } = "gemini-2.5-flash";

    // Soft daily quota guard. Conservative default since exact Gemini free-tier
    // RPD is unconfirmed; tune after checking Google AI Studio dashboard.
    public int GeminiDailyQuota { get; set; } = 200;
}
