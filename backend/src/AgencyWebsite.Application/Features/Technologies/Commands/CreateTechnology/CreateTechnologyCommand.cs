using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.Technologies.Commands.CreateTechnology;

public class CreateTechnologyCommand : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public TechnologyCategory Category { get; set; }
    public int DisplayOrder { get; set; }
}
