using MediatR;

namespace AgencyWebsite.Application.Features.Faqs.Queries.GetAllFaqsAdmin;

public class GetAllFaqsAdminQuery : IRequest<List<AdminFaqDto>>
{
}
