using Devliora.Domain.Common;

namespace Devliora.Domain.Entities;

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

    // Case study fields
    public string Industry { get; set; } = string.Empty;
    public string Challenge { get; set; } = string.Empty;
    public string Approach { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;
    public Guid? TestimonialId { get; set; }
    public Testimonial? Testimonial { get; set; }

    public ICollection<PortfolioImage> Images { get; set; } = new List<PortfolioImage>();
    public ICollection<PortfolioMetric> Metrics { get; set; } = new List<PortfolioMetric>();
}
