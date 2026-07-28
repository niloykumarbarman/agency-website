using MediatR;

namespace Devliora.Application.Features.Technologies.Queries.GetAllTechnologiesAdmin;

public class GetAllTechnologiesAdminQuery : IRequest<List<AdminTechnologyDto>>
{
}
