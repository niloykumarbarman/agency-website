using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;

public class GetAllTestimonialsQueryHandler : IRequestHandler<GetAllTestimonialsQuery, List<TestimonialDto>>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllTestimonialsQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<TestimonialDto>> Handle(GetAllTestimonialsQuery request, CancellationToken cancellationToken)
    {
        var cacheKey = request.FeaturedOnly ? "testimonials:featured" : "testimonials:all";

        var cached = await _cache.GetAsync<List<TestimonialDto>>(cacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var query = _context.Testimonials.Where(t => !t.IsDeleted);

        if (request.FeaturedOnly)
        {
            query = query.Where(t => t.IsFeatured);
        }

        var result = await query
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TestimonialDto
            {
                Id = t.Id,
                ClientName = t.ClientName,
                ClientTitle = t.ClientTitle,
                ClientCompany = t.ClientCompany,
                ClientPhotoUrl = t.ClientPhotoUrl,
                Quote = t.Quote,
                Rating = t.Rating
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(cacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
