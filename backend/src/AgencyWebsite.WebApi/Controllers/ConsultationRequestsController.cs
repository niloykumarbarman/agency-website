using AgencyWebsite.Application.Features.ConsultationRequests.Commands.CreateConsultationRequest;
using AgencyWebsite.Application.Features.ConsultationRequests.Commands.DeleteConsultationRequest;
using AgencyWebsite.Application.Features.ConsultationRequests.Commands.UpdateConsultationRequestStatus;
using AgencyWebsite.Application.Features.ConsultationRequests.Queries.GetAllConsultationRequests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/consultation-requests")]
public class ConsultationRequestsController : ControllerBase
{
    private readonly ISender _sender;

    public ConsultationRequestsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<ConsultationRequestDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllConsultationRequestsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateConsultationRequestCommand command, CancellationToken cancellationToken)
    {
        command.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(Guid id, UpdateConsultationRequestStatusCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteConsultationRequestCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
