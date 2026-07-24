using MediatR;

namespace AgencyWebsite.Application.Features.Technologies.Queries.GetAllTechnologiesAdmin;

public class GetAllTechnologiesAdminQuery : IRequest<List<AdminTechnologyDto>>
{
}
