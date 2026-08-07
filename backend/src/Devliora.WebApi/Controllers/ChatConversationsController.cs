using Devliora.Application.Features.Chat.Queries.GetAllConversations;
using Devliora.Application.Features.Chat.Queries.GetConversationMessages;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Devliora.WebApi.Controllers;
[ApiController]
[Route("api/chat-conversations")]
[Authorize(Roles = "Admin")]
public class ChatConversationsController : ControllerBase
{
    private readonly ISender _sender;
    public ChatConversationsController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<List<ConversationSummaryDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllConversationsQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpGet("{id}/messages")]
    public async Task<ActionResult<List<ConversationMessageDto>>> GetMessages(Guid id, CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetConversationMessagesQuery { ConversationId = id }, cancellationToken);
        return Ok(result);
    }
}
