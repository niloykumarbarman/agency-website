using MediatR;
namespace Devliora.Application.Features.OfficeLocations.Commands.CreateOfficeLocation;
public class CreateOfficeLocationCommand : IRequest<Guid>
{
    public string Country { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string MapQuery { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
