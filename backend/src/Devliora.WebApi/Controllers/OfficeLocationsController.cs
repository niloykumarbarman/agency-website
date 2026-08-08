using Devliora.Application.Features.OfficeLocations.Commands.CreateOfficeLocation;
using Devliora.Application.Features.OfficeLocations.Commands.DeleteOfficeLocation;
using Devliora.Application.Features.OfficeLocations.Commands.UpdateOfficeLocation;
using Devliora.Application.Features.OfficeLocations.Queries.GetAllOfficeLocations;
using Devliora.Application.Features.OfficeLocations.Queries.GetAllOfficeLocationsAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Devliora.WebApi.Controllers;
[ApiController]
[Route("api/office-locations")]
public class OfficeLocationsController : ControllerBase
{
    private readonly ISender _sender;
    public OfficeLocationsController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<List<OfficeLocationDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllOfficeLocationsQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<AdminOfficeLocationDto>>> GetAllForAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllOfficeLocationsAdminQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateOfficeLocationCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateOfficeLocationCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteOfficeLocationCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
