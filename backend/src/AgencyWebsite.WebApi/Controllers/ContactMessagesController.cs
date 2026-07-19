using AgencyWebsite.Application.Features.ContactMessages.Commands.CreateContactMessage;
using AgencyWebsite.Application.Features.ContactMessages.Queries.GetAllContactMessages;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/contact-messages")]
public class ContactMessagesController : ControllerBase
{
    private readonly ISender _sender;

    public ContactMessagesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<ContactMessageDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllContactMessagesQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateContactMessageCommand command, CancellationToken cancellationToken)
    {
        command.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;

        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
