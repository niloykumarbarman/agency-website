using AgencyWebsite.Application.Features.Testimonials.Commands.CreateTestimonial;
using AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;
using MediatR;
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

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateTestimonialCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
