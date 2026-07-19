using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.UpdateBlogPost;

public class UpdateBlogPostCommandHandler : IRequestHandler<UpdateBlogPostCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdateBlogPostCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateBlogPostCommand request, CancellationToken cancellationToken)
    {
        var blogPost = await _context.BlogPosts
            .FirstOrDefaultAsync(b => b.Id == request.Id && !b.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"BlogPost with Id '{request.Id}' was not found.");

        blogPost.Title = request.Title;
        blogPost.Slug = request.Slug;
        blogPost.Excerpt = request.Excerpt;
        blogPost.Content = request.Content;
        blogPost.CoverImageUrl = request.CoverImageUrl;
        blogPost.AuthorName = request.AuthorName;

        if (blogPost.Status != BlogPostStatus.Published && request.Status == BlogPostStatus.Published)
        {
            blogPost.PublishedAt = DateTime.UtcNow;
        }

        blogPost.Status = request.Status;
        blogPost.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
