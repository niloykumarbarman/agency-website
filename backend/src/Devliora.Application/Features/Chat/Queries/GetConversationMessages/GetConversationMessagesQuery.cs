using MediatR;
namespace Devliora.Application.Features.Chat.Queries.GetConversationMessages;
public class GetConversationMessagesQuery : IRequest<List<ConversationMessageDto>>
{
    public Guid ConversationId { get; set; }
}
