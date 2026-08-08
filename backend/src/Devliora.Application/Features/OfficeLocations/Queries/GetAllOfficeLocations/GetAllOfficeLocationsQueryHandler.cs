using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.OfficeLocations.Queries.GetAllOfficeLocations;
public class GetAllOfficeLocationsQueryHandler : IRequestHandler<GetAllOfficeLocationsQuery, List<OfficeLocationDto>>
{
    private const string CacheKey = "officelocations:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public GetAllOfficeLocationsQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<List<OfficeLocationDto>> Handle(GetAllOfficeLocationsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<OfficeLocationDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }
        var result = await _context.OfficeLocations
            .Where(o => o.IsActive && !o.IsDeleted)
            .OrderBy(o => o.DisplayOrder)
            .Select(o => new OfficeLocationDto
            {
                Id = o.Id,
                Country = o.Country,
                Address = o.Address,
                Phone = o.Phone,
                Email = o.Email,
                MapQuery = o.MapQuery,
                DisplayOrder = o.DisplayOrder
            })
            .ToListAsync(cancellationToken);
        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);
        return result;
    }
}
