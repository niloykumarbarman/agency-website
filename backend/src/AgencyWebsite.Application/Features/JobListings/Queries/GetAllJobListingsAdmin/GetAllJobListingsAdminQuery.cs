using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListingsAdmin;

public class GetAllJobListingsAdminQuery : IRequest<List<JobListingAdminDto>>
{
}
