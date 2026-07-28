namespace Devliora.Application.Features.Hero.Queries.GetHero;

public class TelemetryPillDto
{
    public Guid Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Accent { get; set; } = string.Empty;
    public decimal Top { get; set; }
    public decimal Left { get; set; }
    public int DisplayOrder { get; set; }
}
