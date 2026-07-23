using FluentValidation;

namespace AgencyWebsite.Application.Features.Technologies.Commands.CreateTechnology;

public class CreateTechnologyCommandValidator : AbstractValidator<CreateTechnologyCommand>
{
    public CreateTechnologyCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Category).IsInEnum();
    }
}
