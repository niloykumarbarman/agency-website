using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Portfolios.Commands.UpdatePortfolio;

public class UpdatePortfolioCommandHandler : IRequestHandler<UpdatePortfolioCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdatePortfolioCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await _context.Portfolios
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Portfolio with Id '{request.Id}' was not found.");

        portfolio.Title = request.Title;
        portfolio.Slug = request.Slug;
        portfolio.ClientName = request.ClientName;
        portfolio.Summary = request.Summary;
        portfolio.ThumbnailUrl = request.ThumbnailUrl;
        portfolio.ProjectUrl = request.ProjectUrl;
        portfolio.TechStack = request.TechStack;
        portfolio.IsFeatured = request.IsFeatured;
        portfolio.DisplayOrder = request.DisplayOrder;
        portfolio.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
