using MediatR;

namespace Devliora.Application.Features.Faqs.Queries.GetAllFaqs;

public class GetAllFaqsQuery : IRequest<List<FaqDto>>
{
}
