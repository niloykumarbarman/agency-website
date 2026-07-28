using MediatR;
using Devliora.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

namespace Devliora.Application.Features.CaseStudies.Queries.GetCaseStudyBySlug;

public class GetCaseStudyBySlugQuery : IRequest<CaseStudyDto?>
{
    public string Slug { get; set; } = string.Empty;
}
