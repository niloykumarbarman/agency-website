using MediatR;

namespace Devliora.Application.Features.JobListings.Queries.GetAllJobListingsAdmin;

public class GetAllJobListingsAdminQuery : IRequest<List<JobListingAdminDto>>
{
}
