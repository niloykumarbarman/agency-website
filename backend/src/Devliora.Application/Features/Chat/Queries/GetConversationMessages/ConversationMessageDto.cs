namespace Devliora.Application.Features.Chat.Queries.GetConversationMessages;
public class ConversationMessageDto
{
    public Guid Id { get; set; }
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
