using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfoliosAdmin;

public class GetAllPortfoliosAdminQueryHandler : IRequestHandler<GetAllPortfoliosAdminQuery, List<AdminPortfolioDto>>
{
    private readonly IAppDbContext _context;

    public GetAllPortfoliosAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<AdminPortfolioDto>> Handle(GetAllPortfoliosAdminQuery request, CancellationToken cancellationToken)
    {
        // Admin view: includes DisplayOrder for reordering UI, and always
        // reflects the latest true database state (no caching).
        return await _context.Portfolios
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.DisplayOrder)
            .Select(p => new AdminPortfolioDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                ClientName = p.ClientName,
                Summary = p.Summary,
                ThumbnailUrl = p.ThumbnailUrl,
                ProjectUrl = p.ProjectUrl,
                TechStack = p.TechStack,
                IsFeatured = p.IsFeatured,
                DisplayOrder = p.DisplayOrder
            })
            .ToListAsync(cancellationToken);
    }
}
