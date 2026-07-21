using FluentValidation;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Commands.CreateConsultationRequest;

public class CreateConsultationRequestCommandValidator : AbstractValidator<CreateConsultationRequestCommand>
{
    public CreateConsultationRequestCommandValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(200);
        RuleFor(x => x.Phone).NotEmpty().MaximumLength(50);
        RuleFor(x => x.CompanyName).MaximumLength(200);
        RuleFor(x => x.ServiceInterest).IsInEnum();
        RuleFor(x => x.ProjectBudgetRange).IsInEnum();
        RuleFor(x => x.PreferredTimeSlot).IsInEnum();
        RuleFor(x => x.AdditionalDetails).MaximumLength(5000);
    }
}
