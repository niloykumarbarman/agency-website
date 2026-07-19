using FluentValidation;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.CreateCaseStudy;

public class CreateCaseStudyCommandValidator : AbstractValidator<CreateCaseStudyCommand>
{
    public CreateCaseStudyCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$")
            .WithMessage("Slug must be lowercase, alphanumeric, hyphen-separated.");
        RuleFor(x => x.ClientName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Challenge).NotEmpty();
        RuleFor(x => x.Solution).NotEmpty();
        RuleFor(x => x.Results).NotEmpty();
    }
}
