using MediatR;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Queries.GetAllConsultationRequests;

public class GetAllConsultationRequestsQuery : IRequest<List<ConsultationRequestDto>>
{
}
