using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.UpdateTestimonial;

public class UpdateTestimonialCommandHandler : IRequestHandler<UpdateTestimonialCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdateTestimonialCommandHandler(IAppDbContext context)
    {
        _context = context;
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
        return Unit.Value;
    }
}
