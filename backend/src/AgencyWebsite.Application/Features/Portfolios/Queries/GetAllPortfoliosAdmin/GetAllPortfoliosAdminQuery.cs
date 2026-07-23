using MediatR;

namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfoliosAdmin;

public class GetAllPortfoliosAdminQuery : IRequest<List<AdminPortfolioDto>>
{
}
