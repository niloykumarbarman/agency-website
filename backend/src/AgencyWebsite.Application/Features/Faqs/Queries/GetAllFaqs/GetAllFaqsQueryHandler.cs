using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Faqs.Queries.GetAllFaqs;

public class GetAllFaqsQueryHandler : IRequestHandler<GetAllFaqsQuery, List<FaqDto>>
{
    private const string CacheKey = "faqs:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllFaqsQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<FaqDto>> Handle(GetAllFaqsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<FaqDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.FaqItems
            .Where(f => f.IsActive && !f.IsDeleted)
            .OrderBy(f => f.DisplayOrder)
            .Select(f => new FaqDto
            {
                Id = f.Id,
                Question = f.Question,
                Answer = f.Answer,
                DisplayOrder = f.DisplayOrder
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
