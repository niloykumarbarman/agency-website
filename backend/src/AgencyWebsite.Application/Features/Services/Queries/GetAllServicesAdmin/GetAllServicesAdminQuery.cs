using MediatR;

namespace AgencyWebsite.Application.Features.Services.Queries.GetAllServicesAdmin;

public class GetAllServicesAdminQuery : IRequest<List<AdminServiceDto>>
{
}
