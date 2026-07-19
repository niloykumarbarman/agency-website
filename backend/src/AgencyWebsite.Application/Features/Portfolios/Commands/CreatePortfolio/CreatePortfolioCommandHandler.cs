using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.Portfolios.Commands.CreatePortfolio;

public class CreatePortfolioCommandHandler : IRequestHandler<CreatePortfolioCommand, Guid>
{
    private readonly IAppDbContext _context;

    public CreatePortfolioCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = new Portfolio
        {
            Title = request.Title,
            Slug = request.Slug,
            ClientName = request.ClientName,
            Summary = request.Summary,
            ThumbnailUrl = request.ThumbnailUrl,
            ProjectUrl = request.ProjectUrl,
            TechStack = request.TechStack,
            IsFeatured = request.IsFeatured,
            DisplayOrder = request.DisplayOrder
        };

        _context.Portfolios.Add(portfolio);
        await _context.SaveChangesAsync(cancellationToken);

        return portfolio.Id;
    }
}
