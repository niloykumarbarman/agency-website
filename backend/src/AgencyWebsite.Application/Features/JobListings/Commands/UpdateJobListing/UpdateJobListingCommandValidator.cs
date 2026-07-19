using FluentValidation;

namespace AgencyWebsite.Application.Features.JobListings.Commands.UpdateJobListing;

public class UpdateJobListingCommandValidator : AbstractValidator<UpdateJobListingCommand>
{
    public UpdateJobListingCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$");
        RuleFor(x => x.Description).NotEmpty();
    }
}
