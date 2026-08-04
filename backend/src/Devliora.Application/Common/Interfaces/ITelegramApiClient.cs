namespace Devliora.Application.Common.Interfaces;

public interface ITelegramApiClient
{
    Task SendMessageAsync(long chatId, string text, CancellationToken cancellationToken = default);
}
