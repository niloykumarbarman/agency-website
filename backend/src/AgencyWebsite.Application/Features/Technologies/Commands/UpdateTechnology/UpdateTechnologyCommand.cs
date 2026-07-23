using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.Technologies.Commands.UpdateTechnology;

public class UpdateTechnologyCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public TechnologyCategory Category { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
