using AgencyWebsite.Application.Features.Portfolios.Commands.CreatePortfolio;
using AgencyWebsite.Application.Features.Portfolios.Commands.DeletePortfolio;
using AgencyWebsite.Application.Features.Portfolios.Commands.UpdatePortfolio;
using AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfolios;
using AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfoliosAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/portfolios")]
public class PortfoliosController : ControllerBase
{
    private readonly ISender _sender;

    public PortfoliosController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<PortfolioDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllPortfoliosQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<AdminPortfolioDto>>> GetAllForAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllPortfoliosAdminQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreatePortfolioCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdatePortfolioCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeletePortfolioCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
