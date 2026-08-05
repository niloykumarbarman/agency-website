namespace Devliora.Application.Common.Interfaces;

public interface ITelegramApiClient
{
    Task SendMessageAsync(long chatId, string text, CancellationToken cancellationToken = default);

    Task SendMessageWithButtonsAsync(
        long chatId,
        string text,
        IReadOnlyList<(string Label, string CallbackData)> buttons,
        CancellationToken cancellationToken = default);

    Task AnswerCallbackQueryAsync(string callbackQueryId, CancellationToken cancellationToken = default);
}
