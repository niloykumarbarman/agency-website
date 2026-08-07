using Devliora.Domain.Common;
using Devliora.Domain.Enums;
namespace Devliora.Domain.Entities;
public class ChatConversation : BaseEntity
{
    public ChatChannel Channel { get; set; }
    public string ExternalId { get; set; } = string.Empty; // Telegram chatId or website session id
    public DateTime LastMessageAt { get; set; } = DateTime.UtcNow;
    public List<ChatMessage> Messages { get; set; } = new();
}
