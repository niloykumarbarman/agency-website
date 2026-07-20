using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;

public class CreateTestimonialCommandHandler : IRequestHandler<CreateTestimonialCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateTestimonialCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateTestimonialCommand request, CancellationToken cancellationToken)
    {
        var testimonial = new Testimonial
        {
            ClientName = request.ClientName,
            ClientTitle = request.ClientTitle,
            ClientCompany = request.ClientCompany,
            ClientPhotoUrl = request.ClientPhotoUrl,
            Quote = request.Quote,
            Rating = request.Rating,
            IsFeatured = request.IsFeatured
        };

        _context.Testimonials.Add(testimonial);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("testimonials:all", cancellationToken);
        await _cache.RemoveAsync("testimonials:featured", cancellationToken);

        return testimonial.Id;
    }
}
