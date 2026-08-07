using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using Devliora.Domain.Enums;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Infrastructure.Chat;
public class ChatPersistenceService : IChatPersistenceService
{
    private readonly IAppDbContext _context;
    public ChatPersistenceService(IAppDbContext context)
    {
        _context = context;
    }
    public async Task SaveTurnAsync(
        ChatChannel channel,
        string externalId,
        string role,
        string content,
        CancellationToken cancellationToken = default)
    {
        var conversation = await _context.ChatConversations
            .FirstOrDefaultAsync(
                c => c.Channel == channel && c.ExternalId == externalId && !c.IsDeleted,
                cancellationToken);

        if (conversation is null)
        {
            conversation = new ChatConversation
            {
                Channel = channel,
                ExternalId = externalId,
                LastMessageAt = DateTime.UtcNow
            };
            _context.ChatConversations.Add(conversation);
        }
        else
        {
            conversation.LastMessageAt = DateTime.UtcNow;
        }

        _context.ChatMessages.Add(new ChatMessage
        {
            ConversationId = conversation.Id,
            Role = role,
            Content = content
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
