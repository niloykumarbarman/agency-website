using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListings;

public class GetAllJobListingsQuery : IRequest<List<JobListingDto>>
{
}
