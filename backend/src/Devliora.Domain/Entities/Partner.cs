using Devliora.Domain.Common;
namespace Devliora.Domain.Entities;
public class Partner : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string WebsiteUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
