using MediatR;

namespace AgencyWebsite.Application.Features.ContactMessages.Commands.DeleteContactMessage;

public class DeleteContactMessageCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
