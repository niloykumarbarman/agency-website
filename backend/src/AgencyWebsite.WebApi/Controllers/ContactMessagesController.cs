using AgencyWebsite.Application.Features.ContactMessages.Commands.CreateContactMessage;
using AgencyWebsite.Application.Features.ContactMessages.Queries.GetAllContactMessages;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

// NOTE: GetAll here is admin-facing data (contains PII: names, emails, messages).
// This endpoint MUST be locked behind [Authorize(Roles = "Admin")] once JWT auth is added.
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
    public async Task<ActionResult<List<ContactMessageDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllContactMessagesQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateContactMessageCommand command, CancellationToken cancellationToken)
    {
        // Never trust a client-supplied IP address; always capture it server-side
        // to prevent spoofing in spam/abuse tracking.
        command.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;

        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
