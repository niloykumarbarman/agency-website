using AgencyWebsite.Application.Features.Technologies.Commands.CreateTechnology;
using AgencyWebsite.Application.Features.Technologies.Commands.DeleteTechnology;
using AgencyWebsite.Application.Features.Technologies.Commands.UpdateTechnology;
using AgencyWebsite.Application.Features.Technologies.Queries.GetAllTechnologies;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace AgencyWebsite.WebApi.Controllers;
[ApiController]
[Route("api/technologies")]
public class TechnologiesController : ControllerBase
{
    private readonly ISender _sender;
    public TechnologiesController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<List<TechnologyDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllTechnologiesQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateTechnologyCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateTechnologyCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteTechnologyCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
