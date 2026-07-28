using MediatR;

namespace Devliora.Application.Features.Testimonials.Queries.GetAllTestimonialsAdmin;

public class GetAllTestimonialsAdminQuery : IRequest<List<AdminTestimonialDto>>
{
}
