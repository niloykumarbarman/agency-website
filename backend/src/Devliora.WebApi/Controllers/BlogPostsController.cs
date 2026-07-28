using Devliora.Application.Features.BlogPosts.Commands.CreateBlogPost;
using Devliora.Application.Features.BlogPosts.Commands.DeleteBlogPost;
using Devliora.Application.Features.BlogPosts.Commands.UpdateBlogPost;
using Devliora.Application.Features.BlogPosts.Queries.GetAllBlogPosts;
using Devliora.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;
using Devliora.Application.Features.BlogPosts.Queries.GetBlogPostBySlug;
using Devliora.Application.Features.BlogPosts.Queries.GetBlogPostByIdAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Devliora.WebApi.Controllers;

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

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<BlogPostAdminDto>>> GetAllAdmin(CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetAllBlogPostsAdminQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPostDetailDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetBlogPostBySlugQuery { Slug = slug }, cancellationToken);
        if (result is null) return NotFound();
        return Ok(result);
    }
    [HttpGet("admin/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<BlogPostAdminDetailDto>> GetByIdAdmin(Guid id, CancellationToken cancellationToken)
    {
        var result = await _sender.Send(new GetBlogPostByIdAdminQuery { Id = id }, cancellationToken);
        if (result is null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Guid>> Create(CreateBlogPostCommand command, CancellationToken cancellationToken)
    {
        var id = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, UpdateBlogPostCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id) return BadRequest(new { error = "Route id and body id must match." });
        await _sender.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _sender.Send(new DeleteBlogPostCommand { Id = id }, cancellationToken);
        return NoContent();
    }
}
