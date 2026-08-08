using FluentValidation;
namespace Devliora.Application.Features.OfficeLocations.Commands.UpdateOfficeLocation;
public class UpdateOfficeLocationCommandValidator : AbstractValidator<UpdateOfficeLocationCommand>
{
    public UpdateOfficeLocationCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Country).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Address).NotEmpty().MaximumLength(300);
        RuleFor(x => x.Phone).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(200);
        RuleFor(x => x.MapQuery).NotEmpty().MaximumLength(300);
    }
}
