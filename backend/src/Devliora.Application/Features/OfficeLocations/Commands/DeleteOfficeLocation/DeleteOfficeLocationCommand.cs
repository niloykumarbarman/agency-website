using MediatR;
namespace Devliora.Application.Features.OfficeLocations.Commands.DeleteOfficeLocation;
public class DeleteOfficeLocationCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
