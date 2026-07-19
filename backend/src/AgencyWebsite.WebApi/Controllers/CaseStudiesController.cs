using AgencyWebsite.Application.Features.CaseStudies.Commands.CreateCaseStudy;
using AgencyWebsite.Application.Features.CaseStudies.Commands.DeleteCaseStudy;
using AgencyWebsite.Application.Features.CaseStudies.Commands.UpdateCaseStudy;
using AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/case-studies")]
public class CaseStudiesController : ControllerBase
{
    private readonly ISender _sender;

    public CaseStudiesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<CaseStudyDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllCaseStudiesQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateCaseStudyCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateCaseStudyCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteCaseStudyCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
