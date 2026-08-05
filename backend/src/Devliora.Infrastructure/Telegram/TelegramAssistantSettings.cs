namespace Devliora.Infrastructure.Telegram;

public class TelegramAssistantSettings
{
    public string BotToken { get; set; } = string.Empty;

    // Sent by Telegram in the X-Telegram-Bot-Api-Secret-Token header on every
    // webhook call; must match what was set via setWebhook. Protects the
    // endpoint from spoofed requests.
    public string WebhookSecretToken { get; set; } = string.Empty;

    public string GeminiApiKey { get; set; } = string.Empty;
    public string GeminiModel { get; set; } = "gemini-3.6-flash";

    // Separate app-level Redis counter from the website widget, but both share
    // the same Google Cloud project's Gemini 3.6 Flash quota (20 RPD on free
    // tier, confirmed via Google AI Studio dashboard). Split with headroom:
    // 8 + 8 = 16, leaving 4 as buffer. Raise once billing/Tier 1 is enabled.
    public int GeminiDailyQuota { get; set; } = 8;

    // How long a chat's conversation history is kept in Redis after the
    // last message, in minutes. Keeps memory bounded for inactive chats.
    public int SessionTtlMinutes { get; set; } = 60;
}
