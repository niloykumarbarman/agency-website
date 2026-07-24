using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonialsAdmin;

public class GetAllTestimonialsAdminQueryHandler : IRequestHandler<GetAllTestimonialsAdminQuery, List<AdminTestimonialDto>>
{
    private readonly IAppDbContext _context;

    public GetAllTestimonialsAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<AdminTestimonialDto>> Handle(GetAllTestimonialsAdminQuery request, CancellationToken cancellationToken)
    {
        // Admin view: includes IsFeatured toggle state, and always reflects
        // the latest true database state (no caching).
        return await _context.Testimonials
            .Where(t => !t.IsDeleted)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new AdminTestimonialDto
            {
                Id = t.Id,
                ClientName = t.ClientName,
                ClientTitle = t.ClientTitle,
                ClientCompany = t.ClientCompany,
                ClientPhotoUrl = t.ClientPhotoUrl,
                Quote = t.Quote,
                Rating = t.Rating,
                IsFeatured = t.IsFeatured
            })
            .ToListAsync(cancellationToken);
    }
}
