using MediatR;

namespace Devliora.Application.Features.Telegram.Commands.ProcessUpdate;

public sealed record ProcessTelegramUpdateCommand(long ChatId, string Text) : IRequest;
