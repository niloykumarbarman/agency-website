using MediatR;

namespace Devliora.Application.Features.Testimonials.Queries.GetAllTestimonials;

public class GetAllTestimonialsQuery : IRequest<List<TestimonialDto>>
{
    public bool FeaturedOnly { get; set; } = false;
}
