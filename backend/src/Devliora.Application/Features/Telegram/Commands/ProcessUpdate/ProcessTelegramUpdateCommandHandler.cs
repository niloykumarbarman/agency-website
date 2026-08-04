using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Devliora.Application.Features.Telegram.Commands.ProcessUpdate;

public class ProcessTelegramUpdateCommandHandler : IRequestHandler<ProcessTelegramUpdateCommand>
{
    private readonly ITelegramSessionStore _sessionStore;
    private readonly ITelegramChatService _chatService;
    private readonly ITelegramApiClient _apiClient;
    private readonly ILogger<ProcessTelegramUpdateCommandHandler> _logger;

    public ProcessTelegramUpdateCommandHandler(
        ITelegramSessionStore sessionStore,
        ITelegramChatService chatService,
        ITelegramApiClient apiClient,
        ILogger<ProcessTelegramUpdateCommandHandler> logger)
    {
        _sessionStore = sessionStore;
        _chatService = chatService;
        _apiClient = apiClient;
        _logger = logger;
    }

    public async Task Handle(ProcessTelegramUpdateCommand request, CancellationToken cancellationToken)
    {
        var history = await _sessionStore.GetHistoryAsync(request.ChatId, cancellationToken);

        var userTurn = new ChatTurn("user", request.Text);
        history.Add(userTurn);
        await _sessionStore.AppendTurnAsync(request.ChatId, userTurn, cancellationToken);

        var reply = await _chatService.GetReplyAsync(history, cancellationToken);

        await _sessionStore.AppendTurnAsync(request.ChatId, new ChatTurn("model", reply), cancellationToken);

        await _apiClient.SendMessageAsync(request.ChatId, reply, cancellationToken);

        _logger.LogInformation("Processed Telegram update for chat {ChatId}", request.ChatId);
    }
}
