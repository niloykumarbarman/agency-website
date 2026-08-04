using FluentValidation;

namespace Devliora.Application.Features.Telegram.Commands.ProcessUpdate;

public class ProcessTelegramUpdateCommandValidator : AbstractValidator<ProcessTelegramUpdateCommand>
{
    public ProcessTelegramUpdateCommandValidator()
    {
        RuleFor(x => x.ChatId)
            .NotEqual(0);

        RuleFor(x => x.Text)
            .NotEmpty()
            .MaximumLength(4096);
    }
}
