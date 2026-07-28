using MediatR;

namespace Devliora.Application.Features.ConsultationRequests.Queries.GetAllConsultationRequests;

public class GetAllConsultationRequestsQuery : IRequest<List<ConsultationRequestDto>>
{
}
