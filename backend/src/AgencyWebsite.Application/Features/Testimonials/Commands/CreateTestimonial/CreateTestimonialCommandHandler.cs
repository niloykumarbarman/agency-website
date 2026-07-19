using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;

public class CreateTestimonialCommandHandler : IRequestHandler<CreateTestimonialCommand, Guid>
{
    private readonly IAppDbContext _context;

    public CreateTestimonialCommandHandler(IAppDbContext context)
    {
        _context = context;
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

        return testimonial.Id;
    }
}
