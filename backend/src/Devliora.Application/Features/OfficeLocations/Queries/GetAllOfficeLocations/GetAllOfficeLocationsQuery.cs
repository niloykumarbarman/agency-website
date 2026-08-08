using MediatR;
namespace Devliora.Application.Features.OfficeLocations.Queries.GetAllOfficeLocations;
public class GetAllOfficeLocationsQuery : IRequest<List<OfficeLocationDto>>
{
}
