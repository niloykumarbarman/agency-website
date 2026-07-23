using AgencyWebsite.Application.Features.Hero.Commands.UpdateHero;
using AgencyWebsite.Application.Features.Hero.Queries.GetHero;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace AgencyWebsite.WebApi.Controllers;
[ApiController]
[Route("api/hero")]
public class HeroController : ControllerBase
{
    private readonly ISender _sender;
    public HeroController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<HeroDto>> Get(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetHeroQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(UpdateHeroCommand command, CancellationToken cancellationToken)
    {
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }
}
