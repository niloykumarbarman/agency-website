using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Services.Queries.GetAllServices;

public class GetAllServicesQueryHandler : IRequestHandler<GetAllServicesQuery, List<ServiceDto>>
{
    private const string CacheKey = "services:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllServicesQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<ServiceDto>> Handle(GetAllServicesQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<ServiceDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.Services
            .Where(s => s.IsActive && !s.IsDeleted)
            .OrderBy(s => s.DisplayOrder)
            .Select(s => new ServiceDto
            {
                Id = s.Id,
                Title = s.Title,
                Slug = s.Slug,
                ShortDescription = s.ShortDescription,
                IconUrl = s.IconUrl,
                DisplayOrder = s.DisplayOrder
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
