using MediatR;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.DeleteCaseStudy;

public class DeleteCaseStudyCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
