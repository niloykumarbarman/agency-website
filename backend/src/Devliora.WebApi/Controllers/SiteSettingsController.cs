using Devliora.Application.Features.SiteSettings.Commands.UpdateSiteSettings;
using Devliora.Application.Features.SiteSettings.Queries.GetSiteSettings;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Devliora.WebApi.Controllers;
[ApiController]
[Route("api/site-settings")]
public class SiteSettingsController : ControllerBase
{
    private readonly ISender _sender;
    public SiteSettingsController(ISender sender)
    {
        _sender = sender;
    }
    [HttpGet]
    public async Task<ActionResult<SiteSettingsDto>> Get(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetSiteSettingsQuery(), cancellationToken);
        return Ok(result);
    }
    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(UpdateSiteSettingsCommand command, CancellationToken cancellationToken)
    {
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }
}
