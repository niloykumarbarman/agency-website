using MediatR;

namespace Devliora.Application.Features.Portfolios.Queries.GetAllPortfoliosAdmin;

public class GetAllPortfoliosAdminQuery : IRequest<List<AdminPortfolioDto>>
{
}
