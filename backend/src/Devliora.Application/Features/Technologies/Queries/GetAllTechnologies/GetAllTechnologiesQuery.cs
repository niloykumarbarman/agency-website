using MediatR;

namespace Devliora.Application.Features.Technologies.Queries.GetAllTechnologies;

public class GetAllTechnologiesQuery : IRequest<List<TechnologyDto>>
{
}
