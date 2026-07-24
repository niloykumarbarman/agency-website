using AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;
using AgencyWebsite.Application.Features.Testimonials.Commands.DeleteTestimonial;
using AgencyWebsite.Application.Features.Testimonials.Commands.UpdateTestimonial;
using AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;
using AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonialsAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/testimonials")]
public class TestimonialsController : ControllerBase
{
    private readonly ISender _sender;

    public TestimonialsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<TestimonialDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllTestimonialsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<AdminTestimonialDto>>> GetAllForAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllTestimonialsAdminQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateTestimonialCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateTestimonialCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteTestimonialCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
