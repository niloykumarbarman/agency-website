using MediatR;

namespace Devliora.Application.Features.Portfolios.Queries.GetAllPortfolios;

public class GetAllPortfoliosQuery : IRequest<List<PortfolioDto>>
{
    public bool FeaturedOnly { get; set; } = false;
}
