using MediatR;

namespace AgencyWebsite.Application.Features.Technologies.Queries.GetAllTechnologies;

public class GetAllTechnologiesQuery : IRequest<List<TechnologyDto>>
{
}
