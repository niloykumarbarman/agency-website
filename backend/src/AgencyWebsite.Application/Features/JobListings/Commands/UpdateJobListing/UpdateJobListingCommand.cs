using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Commands.UpdateJobListing;

public class UpdateJobListingCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string EmploymentType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Requirements { get; set; } = string.Empty;
}
