using FluentValidation;

namespace Devliora.Application.Features.SiteSettings.Commands.UpdateSiteSettings;

public class UpdateSiteSettingsCommandValidator : AbstractValidator<UpdateSiteSettingsCommand>
{
    public UpdateSiteSettingsCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.LogoUrl).MaximumLength(500);
        RuleFor(x => x.SiteName).NotEmpty().MaximumLength(100);
    }
}
