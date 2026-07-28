using MediatR;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudiesAdmin;

public class GetAllCaseStudiesAdminQuery : IRequest<List<AdminCaseStudyDto>>
{
}
