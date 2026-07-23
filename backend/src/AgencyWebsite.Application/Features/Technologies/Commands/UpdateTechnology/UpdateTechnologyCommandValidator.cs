using FluentValidation;

namespace AgencyWebsite.Application.Features.Technologies.Commands.UpdateTechnology;

public class UpdateTechnologyCommandValidator : AbstractValidator<UpdateTechnologyCommand>
{
    public UpdateTechnologyCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Category).IsInEnum();
    }
}
