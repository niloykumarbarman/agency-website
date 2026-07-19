using AgencyWebsite.Domain.Common;

namespace AgencyWebsite.Domain.Entities;

public class Admin : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin";
    public bool IsActive { get; set; } = true;
}
