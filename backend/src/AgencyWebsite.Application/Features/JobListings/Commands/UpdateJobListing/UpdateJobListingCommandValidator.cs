using FluentValidation;

namespace AgencyWebsite.Application.Features.JobListings.Commands.UpdateJobListing;

public class UpdateJobListingCommandValidator : AbstractValidator<UpdateJobListingCommand>
{
    public UpdateJobListingCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$")
            .WithMessage("Slug must be lowercase, alphanumeric, hyphen-separated.");
        RuleFor(x => x.Department).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Location).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Status).IsInEnum();
    }
}
