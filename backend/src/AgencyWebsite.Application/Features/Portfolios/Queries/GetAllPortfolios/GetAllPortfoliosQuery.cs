using MediatR;

namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfolios;

public class GetAllPortfoliosQuery : IRequest<List<PortfolioDto>>
{
    public bool FeaturedOnly { get; set; } = false;
}
