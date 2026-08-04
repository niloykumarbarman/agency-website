namespace Devliora.Application.Common.Interfaces;

public interface ITelegramSessionStore
{
    Task<List<ChatTurn>> GetHistoryAsync(long chatId, CancellationToken cancellationToken = default);

    Task AppendTurnAsync(long chatId, ChatTurn turn, CancellationToken cancellationToken = default);

    Task ClearAsync(long chatId, CancellationToken cancellationToken = default);
}
