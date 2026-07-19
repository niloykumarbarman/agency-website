using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPosts;

public class GetAllBlogPostsQueryHandler : IRequestHandler<GetAllBlogPostsQuery, List<BlogPostDto>>
{
    private readonly IAppDbContext _context;

    public GetAllBlogPostsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<BlogPostDto>> Handle(GetAllBlogPostsQuery request, CancellationToken cancellationToken)
    {
        return await _context.BlogPosts
            .Where(b => b.Status == BlogPostStatus.Published && !b.IsDeleted)
            .OrderByDescending(b => b.PublishedAt)
            .Select(b => new BlogPostDto
            {
                Id = b.Id,
                Title = b.Title,
                Slug = b.Slug,
                Excerpt = b.Excerpt,
                CoverImageUrl = b.CoverImageUrl,
                AuthorName = b.AuthorName,
                PublishedAt = b.PublishedAt
            })
            .ToListAsync(cancellationToken);
    }
}
