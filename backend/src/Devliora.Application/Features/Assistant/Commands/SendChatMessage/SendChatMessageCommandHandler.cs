using Devliora.Application.Common.Interfaces;
using MediatR;

namespace Devliora.Application.Features.Assistant.Commands.SendChatMessage;

public class SendChatMessageCommandHandler : IRequestHandler<SendChatMessageCommand, string>
{
    private readonly IAssistantChatService _chatService;

    public SendChatMessageCommandHandler(IAssistantChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task<string> Handle(SendChatMessageCommand request, CancellationToken cancellationToken)
    {
        var history = request.History
            .Select(h => new ChatTurn(h.Role, h.Content))
            .ToList();

        history.Add(new ChatTurn("user", request.Message));

        return await _chatService.GetReplyAsync(history, cancellationToken);
    }
}
