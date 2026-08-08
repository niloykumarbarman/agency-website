using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Partners.Queries.GetAllPartners;
public class GetAllPartnersQueryHandler : IRequestHandler<GetAllPartnersQuery, List<PartnerDto>>
{
    private const string CacheKey = "partners:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public GetAllPartnersQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<List<PartnerDto>> Handle(GetAllPartnersQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<PartnerDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }
        var result = await _context.Partners
            .Where(p => p.IsActive && !p.IsDeleted)
            .OrderBy(p => p.DisplayOrder)
            .Select(p => new PartnerDto
            {
                Id = p.Id,
                Name = p.Name,
                LogoUrl = p.LogoUrl,
                WebsiteUrl = p.WebsiteUrl,
                DisplayOrder = p.DisplayOrder
            })
            .ToListAsync(cancellationToken);
        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);
        return result;
    }
}
