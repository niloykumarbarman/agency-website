using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Commands.DeleteJobListing;

public class DeleteJobListingCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
