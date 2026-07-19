using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.ContactMessages.Commands.UpdateContactMessageStatus;

public class UpdateContactMessageStatusCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public ContactMessageStatus Status { get; set; }
}
