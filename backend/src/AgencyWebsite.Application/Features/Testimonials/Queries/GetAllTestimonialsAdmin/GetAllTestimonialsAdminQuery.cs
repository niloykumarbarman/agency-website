using MediatR;

namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonialsAdmin;

public class GetAllTestimonialsAdminQuery : IRequest<List<AdminTestimonialDto>>
{
}
