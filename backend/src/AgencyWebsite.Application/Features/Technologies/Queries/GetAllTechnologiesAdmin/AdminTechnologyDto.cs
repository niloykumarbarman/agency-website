using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Application.Features.Technologies.Queries.GetAllTechnologiesAdmin;

public class AdminTechnologyDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public TechnologyCategory Category { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
