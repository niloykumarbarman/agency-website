using MediatR;

namespace AgencyWebsite.Application.Features.Portfolios.Commands.CreatePortfolio;

public class CreatePortfolioCommand : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public bool IsFeatured { get; set; } = false;
    public int DisplayOrder { get; set; }
}
