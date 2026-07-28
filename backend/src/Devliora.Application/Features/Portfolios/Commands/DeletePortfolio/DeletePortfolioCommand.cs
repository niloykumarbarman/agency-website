using MediatR;

namespace Devliora.Application.Features.Portfolios.Commands.DeletePortfolio;

public class DeletePortfolioCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
