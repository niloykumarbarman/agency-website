using Devliora.Domain.Common;
using Devliora.Domain.Enums;

namespace Devliora.Domain.Entities;

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
