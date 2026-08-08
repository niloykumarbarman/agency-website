using FluentValidation;
namespace Devliora.Application.Features.Partners.Commands.UpdatePartner;
public class UpdatePartnerCommandValidator : AbstractValidator<UpdatePartnerCommand>
{
    public UpdatePartnerCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.LogoUrl).NotEmpty().MaximumLength(500);
        RuleFor(x => x.WebsiteUrl).MaximumLength(500);
    }
}
