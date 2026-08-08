using MediatR;
namespace Devliora.Application.Features.Partners.Commands.UpdatePartner;
public class UpdatePartnerCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string WebsiteUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
