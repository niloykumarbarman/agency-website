namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

public class CaseStudyDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
}
