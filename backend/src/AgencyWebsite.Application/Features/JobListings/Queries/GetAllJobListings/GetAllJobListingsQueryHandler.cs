using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListings;

public class GetAllJobListingsQueryHandler : IRequestHandler<GetAllJobListingsQuery, List<JobListingDto>>
{
    private const string CacheKey = "joblistings:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllJobListingsQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<JobListingDto>> Handle(GetAllJobListingsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<JobListingDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.JobListings
            .Where(j => j.Status == JobListingStatus.Open && !j.IsDeleted)
            .OrderByDescending(j => j.CreatedAt)
            .Select(j => new JobListingDto
            {
                Id = j.Id,
                Title = j.Title,
                Slug = j.Slug,
                Department = j.Department,
                Location = j.Location,
                EmploymentType = j.EmploymentType
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
