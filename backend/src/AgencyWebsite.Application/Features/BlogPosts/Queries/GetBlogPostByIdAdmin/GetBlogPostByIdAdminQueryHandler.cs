using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetBlogPostByIdAdmin;

public class GetBlogPostByIdAdminQueryHandler : IRequestHandler<GetBlogPostByIdAdminQuery, BlogPostAdminDetailDto?>
{
    private readonly IAppDbContext _context;
    public GetBlogPostByIdAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }
    public async Task<BlogPostAdminDetailDto?> Handle(GetBlogPostByIdAdminQuery request, CancellationToken cancellationToken)
    {
        return await _context.BlogPosts
            .Where(b => b.Id == request.Id && !b.IsDeleted)
            .Select(b => new BlogPostAdminDetailDto
            {
                Id = b.Id,
                Title = b.Title,
                Slug = b.Slug,
                Excerpt = b.Excerpt,
                Content = b.Content,
                CoverImageUrl = b.CoverImageUrl,
                AuthorName = b.AuthorName,
                PublishedAt = b.PublishedAt,
                Status = b.Status.ToString()
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
