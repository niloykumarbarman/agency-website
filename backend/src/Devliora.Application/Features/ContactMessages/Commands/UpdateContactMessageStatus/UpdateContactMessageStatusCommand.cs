using Devliora.Domain.Enums;
using MediatR;

namespace Devliora.Application.Features.ContactMessages.Commands.UpdateContactMessageStatus;

public class UpdateContactMessageStatusCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public ContactMessageStatus Status { get; set; }
}
