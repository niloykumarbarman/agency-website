using FluentValidation;

namespace AgencyWebsite.Application.Features.Auth.Commands.Logout;

public class LogoutCommandValidator : AbstractValidator<LogoutCommand>
{
    public LogoutCommandValidator()
    {
        RuleFor(x => x.Token).NotEmpty();
    }
}
