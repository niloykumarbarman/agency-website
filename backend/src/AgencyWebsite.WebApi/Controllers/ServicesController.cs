using AgencyWebsite.Application.Features.Services.Commands.CreateService;
using AgencyWebsite.Application.Features.Services.Commands.DeleteService;
using AgencyWebsite.Application.Features.Services.Commands.UpdateService;
using AgencyWebsite.Application.Features.Services.Queries.GetAllServices;
using AgencyWebsite.Application.Features.Services.Queries.GetAllServicesAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
    private readonly ISender _sender;

    public ServicesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<ServiceDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllServicesQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<AdminServiceDto>>> GetAllForAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllServicesAdminQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateServiceCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateServiceCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteServiceCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
