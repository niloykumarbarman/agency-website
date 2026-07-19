using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.UpdateTestimonial;

public class UpdateTestimonialCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientTitle { get; set; } = string.Empty;
    public string ClientCompany { get; set; } = string.Empty;
    public string ClientPhotoUrl { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public int Rating { get; set; }
    public bool IsFeatured { get; set; }
}
