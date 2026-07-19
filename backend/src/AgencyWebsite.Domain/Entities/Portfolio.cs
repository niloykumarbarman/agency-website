using AgencyWebsite.Domain.Common;

namespace AgencyWebsite.Domain.Entities;

public class Portfolio : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty; // comma-separated, normalize later if needed
    public bool IsFeatured { get; set; } = false;
    public int DisplayOrder { get; set; }
}
