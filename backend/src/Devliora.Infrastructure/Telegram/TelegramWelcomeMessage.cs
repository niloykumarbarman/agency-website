namespace Devliora.Infrastructure.Telegram;

public static class TelegramWelcomeMessage
{
    public const string Text =
        "Welcome to Devliora! I'm your AI assistant here to help with questions about our " +
        "enterprise software development services. Ask me anything, or tap a question below to get started.";

    // (Button label, full question text sent to Gemini when tapped)
    public static readonly IReadOnlyList<(string Label, string Question)> SuggestedQuestions = new (string, string)[]
    {
        ("What services do you offer?", "What services do you offer?"),
        ("Tell me about your projects", "Tell me about your projects"),
        ("What's your tech stack?", "What's your tech stack?"),
        ("How can I contact you?", "How can I contact you?")
    };
}
