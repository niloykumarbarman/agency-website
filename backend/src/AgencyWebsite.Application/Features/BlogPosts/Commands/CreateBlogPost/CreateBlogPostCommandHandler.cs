using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.CreateBlogPost;

public class CreateBlogPostCommandHandler : IRequestHandler<CreateBlogPostCommand, Guid>
{
    private readonly IAppDbContext _context;

    public CreateBlogPostCommandHandler(IAppDbContext context)
    {
        _context = context;
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

        return blogPost.Id;
    }
}
