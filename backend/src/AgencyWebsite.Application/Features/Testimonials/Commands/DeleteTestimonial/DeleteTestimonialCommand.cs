using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.DeleteTestimonial;

public class DeleteTestimonialCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
