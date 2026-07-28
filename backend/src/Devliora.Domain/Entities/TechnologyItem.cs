using Devliora.Domain.Common;
using Devliora.Domain.Enums;
namespace Devliora.Domain.Entities;
public class TechnologyItem : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public TechnologyCategory Category { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
