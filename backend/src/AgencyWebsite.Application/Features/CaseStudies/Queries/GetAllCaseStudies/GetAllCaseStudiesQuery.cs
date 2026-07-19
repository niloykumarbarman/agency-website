using MediatR;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

public class GetAllCaseStudiesQuery : IRequest<List<CaseStudyDto>>
{
}
