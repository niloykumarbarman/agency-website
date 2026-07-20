using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.CreateBlogPost;

public class CreateBlogPostCommandHandler : IRequestHandler<CreateBlogPostCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateBlogPostCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateBlogPostCommand request, CancellationToken cancellationToken)
    {
        var blogPost = new BlogPost
        {
            Title = request.Title,
            Slug = request.Slug,
            Excerpt = request.Excerpt,
            Content = request.Content,
            CoverImageUrl = request.CoverImageUrl,
            AuthorName = request.AuthorName,
            Status = request.Status,
            PublishedAt = request.Status == BlogPostStatus.Published ? DateTime.UtcNow : null
        };

        _context.BlogPosts.Add(blogPost);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("blogposts:all", cancellationToken);

        return blogPost.Id;
    }
}
