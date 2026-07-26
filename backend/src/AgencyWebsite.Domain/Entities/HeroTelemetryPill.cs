using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Domain.Entities;

public class HeroTelemetryPill : BaseEntity
{
    public string Label { get; set; } = string.Empty;
    public TelemetryAccent Accent { get; set; }
    public decimal Top { get; set; }
    public decimal Left { get; set; }
    public int DisplayOrder { get; set; }

    public Guid HeroContentId { get; set; }
    public HeroContent HeroContent { get; set; } = null!;
}
