namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfoliosAdmin;

public class AdminPortfolioDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public int DisplayOrder { get; set; }
}
