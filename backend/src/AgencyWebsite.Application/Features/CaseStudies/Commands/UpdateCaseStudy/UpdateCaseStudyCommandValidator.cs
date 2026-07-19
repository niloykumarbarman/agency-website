using FluentValidation;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.UpdateCaseStudy;

public class UpdateCaseStudyCommandValidator : AbstractValidator<UpdateCaseStudyCommand>
{
    public UpdateCaseStudyCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$");
        RuleFor(x => x.ClientName).NotEmpty();
    }
}
