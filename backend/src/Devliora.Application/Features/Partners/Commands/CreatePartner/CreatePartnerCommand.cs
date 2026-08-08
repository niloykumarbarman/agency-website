using MediatR;
namespace Devliora.Application.Features.Partners.Commands.CreatePartner;
public class CreatePartnerCommand : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string WebsiteUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
