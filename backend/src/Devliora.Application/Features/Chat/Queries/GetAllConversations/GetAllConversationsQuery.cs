using MediatR;
namespace Devliora.Application.Features.Chat.Queries.GetAllConversations;
public class GetAllConversationsQuery : IRequest<List<ConversationSummaryDto>>
{
}
