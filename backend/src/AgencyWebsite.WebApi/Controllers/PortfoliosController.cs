using AgencyWebsite.Application.Features.Portfolios.Commands.CreatePortfolio;
using AgencyWebsite.Application.Features.Portfolios.Queries.GetAllPortfolios;
using MediatR;
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

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreatePortfolioCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
