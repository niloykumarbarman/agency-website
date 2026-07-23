using MediatR;

namespace AgencyWebsite.Application.Features.Hero.Commands.UpdateHero;

public class UpdateHeroCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string PrimaryCtaText { get; set; } = string.Empty;
    public string PrimaryCtaUrl { get; set; } = string.Empty;
    public string SecondaryCtaText { get; set; } = string.Empty;
    public string SecondaryCtaUrl { get; set; } = string.Empty;
}
