using Devliora.Domain.Common;
using Devliora.Domain.Enums;

namespace Devliora.Domain.Entities;

public class ContactMessage : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public ContactMessageStatus Status { get; set; } = ContactMessageStatus.New;
    public string IpAddress { get; set; } = string.Empty; // audit/rate-limit trail
    public string Source { get; set; } = "contact-form"; // e.g. "contact-form", "assistant-chat"
}
