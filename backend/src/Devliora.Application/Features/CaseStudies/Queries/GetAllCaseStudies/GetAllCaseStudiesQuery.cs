using MediatR;

namespace Devliora.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

public class GetAllCaseStudiesQuery : IRequest<List<CaseStudyDto>>
{
}
