using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

public class GetAllCaseStudiesQueryHandler : IRequestHandler<GetAllCaseStudiesQuery, List<CaseStudyDto>>
{
    private const string CacheKey = "casestudies:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllCaseStudiesQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<CaseStudyDto>> Handle(GetAllCaseStudiesQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<CaseStudyDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.CaseStudies
            .Where(c => c.IsPublished && !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CaseStudyDto
            {
                Id = c.Id,
                Title = c.Title,
                Slug = c.Slug,
                ClientName = c.ClientName,
                Industry = c.Industry,
                CoverImageUrl = c.CoverImageUrl
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
