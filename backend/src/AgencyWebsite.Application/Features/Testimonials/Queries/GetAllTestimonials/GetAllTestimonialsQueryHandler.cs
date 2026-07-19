using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;

public class GetAllTestimonialsQueryHandler : IRequestHandler<GetAllTestimonialsQuery, List<TestimonialDto>>
{
    private readonly IAppDbContext _context;

    public GetAllTestimonialsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TestimonialDto>> Handle(GetAllTestimonialsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Testimonials.Where(t => !t.IsDeleted);

        if (request.FeaturedOnly)
        {
            query = query.Where(t => t.IsFeatured);
        }

        return await query
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
    }
}
