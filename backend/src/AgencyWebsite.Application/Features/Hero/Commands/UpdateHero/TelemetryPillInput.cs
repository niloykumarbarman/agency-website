namespace AgencyWebsite.Application.Features.Hero.Commands.UpdateHero;

public class TelemetryPillInput
{
    public string Label { get; set; } = string.Empty;
    public string Accent { get; set; } = string.Empty;
    public decimal Top { get; set; }
    public decimal Left { get; set; }
    public int DisplayOrder { get; set; }
}
