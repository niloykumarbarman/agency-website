using FluentValidation;

namespace AgencyWebsite.Application.Features.Hero.Commands.UpdateHero;

public class UpdateHeroCommandValidator : AbstractValidator<UpdateHeroCommand>
{
    public UpdateHeroCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Subtitle).NotEmpty().MaximumLength(500);
        RuleFor(x => x.PrimaryCtaText).NotEmpty().MaximumLength(100);
        RuleFor(x => x.PrimaryCtaUrl).NotEmpty().MaximumLength(300);
        RuleFor(x => x.SecondaryCtaText).NotEmpty().MaximumLength(100);
        RuleFor(x => x.SecondaryCtaUrl).NotEmpty().MaximumLength(300);
        RuleFor(x => x.BackgroundImageUrl).MaximumLength(500);
    }
}
