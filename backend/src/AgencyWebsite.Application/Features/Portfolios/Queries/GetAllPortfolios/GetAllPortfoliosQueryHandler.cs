using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfolios;

public class GetAllPortfoliosQueryHandler : IRequestHandler<GetAllPortfoliosQuery, List<PortfolioDto>>
{
    private readonly IAppDbContext _context;

    public GetAllPortfoliosQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PortfolioDto>> Handle(GetAllPortfoliosQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Portfolios.Where(p => !p.IsDeleted);

        if (request.FeaturedOnly)
        {
            query = query.Where(p => p.IsFeatured);
        }

        return await query
            .OrderBy(p => p.DisplayOrder)
            .Select(p => new PortfolioDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                ClientName = p.ClientName,
                Summary = p.Summary,
                ThumbnailUrl = p.ThumbnailUrl,
                ProjectUrl = p.ProjectUrl,
                TechStack = p.TechStack,
                IsFeatured = p.IsFeatured
            })
            .ToListAsync(cancellationToken);
    }
}
