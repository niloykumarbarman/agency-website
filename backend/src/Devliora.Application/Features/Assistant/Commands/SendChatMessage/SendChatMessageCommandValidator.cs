using FluentValidation;

namespace Devliora.Application.Features.Assistant.Commands.SendChatMessage;

public class SendChatMessageCommandValidator : AbstractValidator<SendChatMessageCommand>
{
    public SendChatMessageCommandValidator()
    {
        RuleFor(x => x.Message).NotEmpty().MaximumLength(2000);
        RuleFor(x => x.History).Must(h => h.Count <= 20).WithMessage("Conversation history is too long.");
    }
}
