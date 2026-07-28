using MediatR;

namespace Devliora.Application.Features.JobListings.Queries.GetAllJobListings;

public class GetAllJobListingsQuery : IRequest<List<JobListingDto>>
{
}
