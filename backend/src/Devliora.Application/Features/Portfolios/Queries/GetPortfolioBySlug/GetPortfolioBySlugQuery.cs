using MediatR;

namespace Devliora.Application.Features.Portfolios.Queries.GetPortfolioBySlug;

public class GetPortfolioBySlugQuery : IRequest<PortfolioDetailDto?>
{
    public string Slug { get; set; } = string.Empty;
}
