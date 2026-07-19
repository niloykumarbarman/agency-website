using MediatR;

namespace AgencyWebsite.Application.Features.Services.Queries.GetAllServices;

public class GetAllServicesQuery : IRequest<List<ServiceDto>>
{
}
