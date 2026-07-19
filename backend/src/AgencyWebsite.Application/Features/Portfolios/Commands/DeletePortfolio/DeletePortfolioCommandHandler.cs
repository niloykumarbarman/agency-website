using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Portfolios.Commands.DeletePortfolio;

public class DeletePortfolioCommandHandler : IRequestHandler<DeletePortfolioCommand, Unit>
{
    private readonly IAppDbContext _context;

    public DeletePortfolioCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeletePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await _context.Portfolios
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Portfolio with Id '{request.Id}' was not found.");

        portfolio.IsDeleted = true;
        portfolio.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
