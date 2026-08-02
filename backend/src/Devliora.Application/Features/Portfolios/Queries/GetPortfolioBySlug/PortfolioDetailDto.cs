using Devliora.Application.Features.Portfolios.Common;

namespace Devliora.Application.Features.Portfolios.Queries.GetPortfolioBySlug;

public class PortfolioDetailDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Challenge { get; set; } = string.Empty;
    public string Approach { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;

    public Guid? TestimonialId { get; set; }
    public string? TestimonialQuote { get; set; }
    public string? TestimonialClientName { get; set; }
    public string? TestimonialClientTitle { get; set; }

    public List<PortfolioImageItem> Images { get; set; } = new();
    public List<PortfolioMetricItem> Metrics { get; set; } = new();
}
