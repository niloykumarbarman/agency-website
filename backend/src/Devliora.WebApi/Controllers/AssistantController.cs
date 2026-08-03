using Devliora.Application.Features.Assistant.Commands.SendChatMessage;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Devliora.WebApi.Controllers;

[ApiController]
[Route("api/assistant")]
public class AssistantController : ControllerBase
{
    private readonly ISender _sender;

    public AssistantController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("chat")]
    [EnableRateLimiting("assistant")]
    public async Task<ActionResult<string>> Chat(SendChatMessageCommand command, CancellationToken cancellationToken)
    {
        var reply = await _sender.Send(command, cancellationToken);
        return Ok(new { reply });
    }
}
