using MediatR;

namespace AgencyWebsite.Application.Features.Services.Commands.DeleteService;

public class DeleteServiceCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
