namespace Devliora.Application.Common.Interfaces;

public interface ITelegramChatService
{
    Task<string> GetReplyAsync(List<ChatTurn> history, CancellationToken cancellationToken);
}
