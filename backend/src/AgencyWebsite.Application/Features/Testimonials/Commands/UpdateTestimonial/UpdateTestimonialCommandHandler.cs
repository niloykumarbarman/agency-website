using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.UpdateTestimonial;

public class UpdateTestimonialCommandHandler : IRequestHandler<UpdateTestimonialCommand, Unit>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public UpdateTestimonialCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdateTestimonialCommand request, CancellationToken cancellationToken)
    {
        var testimonial = await _context.Testimonials
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Testimonial with Id '{request.Id}' was not found.");

        testimonial.ClientName = request.ClientName;
        testimonial.ClientTitle = request.ClientTitle;
        testimonial.ClientCompany = request.ClientCompany;
        testimonial.ClientPhotoUrl = request.ClientPhotoUrl;
        testimonial.Quote = request.Quote;
        testimonial.Rating = request.Rating;
        testimonial.IsFeatured = request.IsFeatured;
        testimonial.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("testimonials:all", cancellationToken);
        await _cache.RemoveAsync("testimonials:featured", cancellationToken);

        return Unit.Value;
    }
}
