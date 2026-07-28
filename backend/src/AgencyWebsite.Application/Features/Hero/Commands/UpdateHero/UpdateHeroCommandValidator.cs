using AgencyWebsite.Domain.Enums;
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
        RuleFor(x => x.BackgroundVideoUrl).MaximumLength(500);

        RuleForEach(x => x.TelemetryPills).ChildRules(pill =>
        {
            pill.RuleFor(p => p.Label).NotEmpty().MaximumLength(100);
            pill.RuleFor(p => p.Accent)
                .Must(a => Enum.TryParse<TelemetryAccent>(a, out _))
                .WithMessage("Accent must be one of: Signal, Ember");
            pill.RuleFor(p => p.Top).InclusiveBetween(0, 100);
            pill.RuleFor(p => p.Left).InclusiveBetween(0, 100);
        });
    }
}
