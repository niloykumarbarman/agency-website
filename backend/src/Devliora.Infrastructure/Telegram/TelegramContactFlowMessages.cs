namespace Devliora.Infrastructure.Telegram;

public static class TelegramContactFlowMessages
{
    public const string AskName = "Great! Let's get you scheduled for a callback. What's your full name?";
    public const string AskEmail = "Thanks! What's the best email to reach you at?";
    public const string AskPhone = "Got it. What's a good phone number for the callback?";
    public const string AskMessage = "Almost done! Briefly, what would you like to discuss?";
    public const string InvalidEmail = "That doesn't look like a valid email address. Could you try again?";
    public const string Confirmation =
        "Thanks! Your callback request has been submitted. Our team will reach out to you shortly.";
    public const string SubmissionFailed =
        "Sorry, something went wrong submitting your request. Please try again in a moment, or use the contact form on devliora.com.";
    private const string ContactSource = "telegram-bot";
    private const string DefaultSubject = "Telegram callback request";

    public static string Source => ContactSource;
    public static string Subject => DefaultSubject;
}
