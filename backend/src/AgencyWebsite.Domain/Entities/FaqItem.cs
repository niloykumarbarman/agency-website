using AgencyWebsite.Domain.Common;
namespace AgencyWebsite.Domain.Entities;
public class FaqItem : BaseEntity
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
