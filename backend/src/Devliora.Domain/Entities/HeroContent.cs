using Devliora.Domain.Common;
namespace Devliora.Domain.Entities;
public class HeroContent : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string PrimaryCtaText { get; set; } = string.Empty;
    public string PrimaryCtaUrl { get; set; } = string.Empty;
    public string SecondaryCtaText { get; set; } = string.Empty;
    public string SecondaryCtaUrl { get; set; } = string.Empty;
    public string BackgroundImageUrl { get; set; } = string.Empty;
    public string BackgroundVideoUrl { get; set; } = string.Empty;
    public ICollection<HeroTelemetryPill> TelemetryPills { get; set; } = new List<HeroTelemetryPill>();
}
