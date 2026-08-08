using Devliora.Application.Features.Partners.Commands.CreatePartner;
using Devliora.Application.Features.Partners.Commands.DeletePartner;
using Devliora.Application.Features.Partners.Commands.UpdatePartner;
using Devliora.Application.Features.Partners.Queries.GetAllPartners;
using Devliora.Application.Features.Partners.Queries.GetAllPartnersAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Devliora.WebApi.Controllers;
[ApiController]
[Route("api/partners")]
public class PartnersController : ControllerBase
{
    private readonly ISender _sender;
    public PartnersController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<List<PartnerDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllPartnersQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<AdminPartnerDto>>> GetAllForAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllPartnersAdminQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreatePartnerCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdatePartnerCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeletePartnerCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
