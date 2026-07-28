using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;

public class GetAllBlogPostsAdminQueryHandler : IRequestHandler<GetAllBlogPostsAdminQuery, List<BlogPostAdminDto>>
{
    private readonly IAppDbContext _context;

    public GetAllBlogPostsAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<BlogPostAdminDto>> Handle(GetAllBlogPostsAdminQuery request, CancellationToken cancellationToken)
    {
        return await _context.BlogPosts
            .Where(b => !b.IsDeleted)
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new BlogPostAdminDto
            {
                Id = b.Id,
                Title = b.Title,
                Slug = b.Slug,
                Excerpt = b.Excerpt,
                CoverImageUrl = b.CoverImageUrl,
                AuthorName = b.AuthorName,
                PublishedAt = b.PublishedAt,
                Status = b.Status.ToString()
            })
            .ToListAsync(cancellationToken);
    }
}
