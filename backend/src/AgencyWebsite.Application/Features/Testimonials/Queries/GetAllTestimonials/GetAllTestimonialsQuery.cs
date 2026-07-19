using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;

public class GetAllTestimonialsQuery : IRequest<List<TestimonialDto>>
{
    public bool FeaturedOnly { get; set; } = false;
}
