using FluentValidation;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.UpdateTestimonial;

public class UpdateTestimonialCommandValidator : AbstractValidator<UpdateTestimonialCommand>
{
    public UpdateTestimonialCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.ClientName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Quote).NotEmpty();
        RuleFor(x => x.Rating).InclusiveBetween(1, 5);
    }
}
