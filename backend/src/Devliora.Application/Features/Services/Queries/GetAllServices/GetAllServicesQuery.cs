using MediatR;

namespace Devliora.Application.Features.Services.Queries.GetAllServices;

public class GetAllServicesQuery : IRequest<List<ServiceDto>>
{
}
