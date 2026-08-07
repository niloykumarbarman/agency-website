using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Chat.Queries.GetAllConversations;
public class GetAllConversationsQueryHandler : IRequestHandler<GetAllConversationsQuery, List<ConversationSummaryDto>>
{
    private readonly IAppDbContext _context;
    public GetAllConversationsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }
    public async Task<List<ConversationSummaryDto>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.ChatConversations
            .Where(c => !c.IsDeleted)
            .OrderByDescending(c => c.LastMessageAt)
            .Select(c => new ConversationSummaryDto
            {
                Id = c.Id,
                Channel = c.Channel.ToString(),
                ExternalId = c.ExternalId,
                LastMessageAt = c.LastMessageAt,
                MessageCount = c.Messages.Count(m => !m.IsDeleted),
                LastMessagePreview = c.Messages
                    .Where(m => !m.IsDeleted)
                    .OrderByDescending(m => m.CreatedAt)
                    .Select(m => m.Content)
                    .FirstOrDefault() ?? string.Empty
            })
            .ToListAsync(cancellationToken);
        return result;
    }
}
