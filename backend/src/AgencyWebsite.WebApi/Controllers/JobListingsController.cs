using AgencyWebsite.Application.Features.JobListings.Commands.CreateJobListing;
using AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListings;
using MediatR;
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
    public async Task<ActionResult<Guid>> Create(CreateJobListingCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
