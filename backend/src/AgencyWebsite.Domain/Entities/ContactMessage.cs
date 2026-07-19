using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Domain.Entities;

public class ContactMessage : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public ContactMessageStatus Status { get; set; } = ContactMessageStatus.New;
    public string IpAddress { get; set; } = string.Empty; // audit/rate-limit trail
}
