using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Domain.Entities;

public class JobListing : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string EmploymentType { get; set; } = string.Empty; // e.g. Full-time, Contract
    public string Description { get; set; } = string.Empty;
    public string Requirements { get; set; } = string.Empty;
    public JobListingStatus Status { get; set; } = JobListingStatus.Draft;
}
