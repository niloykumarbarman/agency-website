using FluentValidation;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.UpdateBlogPost;

public class UpdateBlogPostCommandValidator : AbstractValidator<UpdateBlogPostCommand>
{
    public UpdateBlogPostCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$")
            .WithMessage("Slug must be lowercase, alphanumeric, hyphen-separated.");
        RuleFor(x => x.Excerpt).NotEmpty().MaximumLength(500);
        RuleFor(x => x.Content).NotEmpty();
        RuleFor(x => x.AuthorName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Status).IsInEnum();
    }
}
