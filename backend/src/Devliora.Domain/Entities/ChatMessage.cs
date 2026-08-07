using Devliora.Domain.Common;
namespace Devliora.Domain.Entities;
public class ChatMessage : BaseEntity
{
    public Guid ConversationId { get; set; }
    public ChatConversation? Conversation { get; set; }
    public string Role { get; set; } = string.Empty; // "user" or "model"
    public string Content { get; set; } = string.Empty;
}
