using MediatR;

namespace Devliora.Application.Features.ConsultationRequests.Commands.DeleteConsultationRequest;

public class DeleteConsultationRequestCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
