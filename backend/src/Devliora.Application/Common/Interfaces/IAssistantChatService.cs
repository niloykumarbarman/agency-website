namespace Devliora.Application.Common.Interfaces;

public sealed record ChatTurn(string Role, string Content);

public interface IAssistantChatService
{
    Task<string> GetReplyAsync(List<ChatTurn> history, CancellationToken cancellationToken);
}
