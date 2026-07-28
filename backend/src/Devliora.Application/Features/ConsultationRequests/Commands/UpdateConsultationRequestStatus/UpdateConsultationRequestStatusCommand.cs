using Devliora.Domain.Enums;
using MediatR;

namespace Devliora.Application.Features.ConsultationRequests.Commands.UpdateConsultationRequestStatus;

public class UpdateConsultationRequestStatusCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public ConsultationRequestStatus Status { get; set; }
}
