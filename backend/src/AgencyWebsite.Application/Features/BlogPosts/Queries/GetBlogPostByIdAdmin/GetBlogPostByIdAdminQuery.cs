using MediatR;
using AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetBlogPostByIdAdmin;

public class GetBlogPostByIdAdminQuery : IRequest<BlogPostAdminDetailDto?>
{
    public Guid Id { get; set; }
}
