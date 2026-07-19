using AgencyWebsite.Application.Features.BlogPosts.Commands.CreateBlogPost;
using AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPosts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgencyWebsite.WebApi.Controllers;

[ApiController]
[Route("api/blog-posts")]
public class BlogPostsController : ControllerBase
{
    private readonly ISender _sender;

    public BlogPostsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<BlogPostDto>>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllBlogPostsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateBlogPostCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }
}
