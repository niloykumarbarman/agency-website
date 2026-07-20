using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfolios;

public class GetAllPortfoliosQueryHandler : IRequestHandler<GetAllPortfoliosQuery, List<PortfolioDto>>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllPortfoliosQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<PortfolioDto>> Handle(GetAllPortfoliosQuery request, CancellationToken cancellationToken)
    {
        var cacheKey = request.FeaturedOnly ? "portfolios:featured" : "portfolios:all";

        var cached = await _cache.GetAsync<List<PortfolioDto>>(cacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var query = _context.Portfolios.Where(p => !p.IsDeleted);

        if (request.FeaturedOnly)
        {
            query = query.Where(p => p.IsFeatured);
        }

        var result = await query
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

        await _cache.SetAsync(cacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
