using MediatR;

namespace Devliora.Application.Features.CaseStudies.Queries.GetAllCaseStudiesAdmin;

public class GetAllCaseStudiesAdminQuery : IRequest<List<AdminCaseStudyDto>>
{
}
