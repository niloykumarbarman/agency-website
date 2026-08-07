using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Enums;
using MediatR;
namespace Devliora.Application.Features.Assistant.Commands.SendChatMessage;
public class SendChatMessageCommandHandler : IRequestHandler<SendChatMessageCommand, string>
{
    private readonly IAssistantChatService _chatService;
    private readonly IChatPersistenceService _persistenceService;
    public SendChatMessageCommandHandler(
        IAssistantChatService chatService,
        IChatPersistenceService persistenceService)
    {
        _chatService = chatService;
        _persistenceService = persistenceService;
    }
    public async Task<string> Handle(SendChatMessageCommand request, CancellationToken cancellationToken)
    {
        var history = request.History
            .Select(h => new ChatTurn(h.Role, h.Content))
            .ToList();
        history.Add(new ChatTurn("user", request.Message));

        var reply = await _chatService.GetReplyAsync(history, cancellationToken);

        if (!string.IsNullOrWhiteSpace(request.SessionId))
        {
            await _persistenceService.SaveTurnAsync(
                ChatChannel.Website, request.SessionId, "user", request.Message, cancellationToken);
            await _persistenceService.SaveTurnAsync(
                ChatChannel.Website, request.SessionId, "model", reply, cancellationToken);
        }

        return reply;
    }
}
