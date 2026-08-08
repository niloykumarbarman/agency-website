using FluentValidation;
namespace Devliora.Application.Features.Partners.Commands.CreatePartner;
public class CreatePartnerCommandValidator : AbstractValidator<CreatePartnerCommand>
{
    public CreatePartnerCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.LogoUrl).NotEmpty().MaximumLength(500);
        RuleFor(x => x.WebsiteUrl).MaximumLength(500);
    }
}
