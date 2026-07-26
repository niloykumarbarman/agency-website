using MediatR;
using AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetCaseStudyBySlug;

public class GetCaseStudyBySlugQuery : IRequest<CaseStudyDto?>
{
    public string Slug { get; set; } = string.Empty;
}
