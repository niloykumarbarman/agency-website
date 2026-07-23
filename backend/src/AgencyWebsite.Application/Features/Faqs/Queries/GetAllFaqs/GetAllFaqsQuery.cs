using MediatR;

namespace AgencyWebsite.Application.Features.Faqs.Queries.GetAllFaqs;

public class GetAllFaqsQuery : IRequest<List<FaqDto>>
{
}
