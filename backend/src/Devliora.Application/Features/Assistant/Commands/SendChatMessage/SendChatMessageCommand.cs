using MediatR;

namespace Devliora.Application.Features.Assistant.Commands.SendChatMessage;

public class ChatMessageDto
{
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public class SendChatMessageCommand : IRequest<string>
{
    public List<ChatMessageDto> History { get; set; } = new();
    public string Message { get; set; } = string.Empty;
}
