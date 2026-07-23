using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;
namespace AgencyWebsite.Domain.Entities;
public class TechnologyItem : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public TechnologyCategory Category { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
