using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Commands.CreateJobListing;

public class CreateJobListingCommand : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string EmploymentType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Requirements { get; set; } = string.Empty;
    public JobListingStatus Status { get; set; } = JobListingStatus.Draft;
}
