using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetBlogPostBySlug;

public class GetBlogPostBySlugQuery : IRequest<BlogPostDetailDto?>
{
    public string Slug { get; set; } = string.Empty;
}
