using MediatR;
namespace Devliora.Application.Features.Partners.Commands.DeletePartner;
public class DeletePartnerCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
