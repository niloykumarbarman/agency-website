using AgencyWebsite.Domain.Common;

namespace AgencyWebsite.Domain.Entities;

public class RefreshToken : BaseEntity
{
    public Guid AdminId { get; set; }
    public string TokenHash { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; } = false;
    public DateTime? RevokedAt { get; set; }
    public string? CreatedByIp { get; set; }
    public string? ReplacedByTokenHash { get; set; }
}
