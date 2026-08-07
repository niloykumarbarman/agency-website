namespace Devliora.Application.Features.Chat.Queries.GetAllConversations;
public class ConversationSummaryDto
{
    public Guid Id { get; set; }
    public string Channel { get; set; } = string.Empty;
    public string ExternalId { get; set; } = string.Empty;
    public DateTime LastMessageAt { get; set; }
    public int MessageCount { get; set; }
    public string LastMessagePreview { get; set; } = string.Empty;
}
