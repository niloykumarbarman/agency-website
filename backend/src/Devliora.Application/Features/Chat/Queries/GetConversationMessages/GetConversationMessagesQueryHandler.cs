using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Chat.Queries.GetConversationMessages;
public class GetConversationMessagesQueryHandler : IRequestHandler<GetConversationMessagesQuery, List<ConversationMessageDto>>
{
    private readonly IAppDbContext _context;
    public GetConversationMessagesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }
    public async Task<List<ConversationMessageDto>> Handle(GetConversationMessagesQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.ChatMessages
            .Where(m => m.ConversationId == request.ConversationId && !m.IsDeleted)
            .OrderBy(m => m.CreatedAt)
            .Select(m => new ConversationMessageDto
            {
                Id = m.Id,
                Role = m.Role,
                Content = m.Content,
                CreatedAt = m.CreatedAt
            })
            .ToListAsync(cancellationToken);
        return result;
    }
}
