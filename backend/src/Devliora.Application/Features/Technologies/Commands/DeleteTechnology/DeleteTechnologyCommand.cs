using MediatR;

namespace Devliora.Application.Features.Technologies.Commands.DeleteTechnology;

public class DeleteTechnologyCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
