using FluentValidation;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;

public class CreateTestimonialCommandValidator : AbstractValidator<CreateTestimonialCommand>
{
    public CreateTestimonialCommandValidator()
    {
        RuleFor(x => x.ClientName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Quote).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.Rating).InclusiveBetween(1, 5);
    }
}
