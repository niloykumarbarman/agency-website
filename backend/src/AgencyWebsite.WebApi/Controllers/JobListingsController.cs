using AgencyWebsite.Application.Features.JobListings.Commands.CreateJobListing;
using AgencyWebsite.Application.Features.JobListings.Commands.DeleteJobListing;
using AgencyWebsite.Application.Features.JobListings.Commands.UpdateJobListing;
using AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListings;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/job-listings")]
public class JobListingsController : ControllerBase
{
    private readonly ISender _sender;

    public JobListingsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobListingDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllJobListingsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateJobListingCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateJobListingCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteJobListingCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
