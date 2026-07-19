using AgencyWebsite.Domain.Common;

namespace AgencyWebsite.Domain.Entities;

public class Testimonial : BaseEntity
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientTitle { get; set; } = string.Empty;
    public string ClientCompany { get; set; } = string.Empty;
    public string ClientPhotoUrl { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public int Rating { get; set; } = 5; // 1-5
    public bool IsFeatured { get; set; } = false;
}
