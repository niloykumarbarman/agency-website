using FluentValidation;

namespace AgencyWebsite.Application.Features.Portfolios.Commands.UpdatePortfolio;

public class UpdatePortfolioCommandValidator : AbstractValidator<UpdatePortfolioCommand>
{
    public UpdatePortfolioCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$");
        RuleFor(x => x.Summary).NotEmpty();
    }
}
