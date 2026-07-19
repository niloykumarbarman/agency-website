using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;

public class CreateTestimonialCommand : IRequest<Guid>
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientTitle { get; set; } = string.Empty;
    public string ClientCompany { get; set; } = string.Empty;
    public string ClientPhotoUrl { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public bool IsFeatured { get; set; } = false;
}
