using MediatR;
using Devliora.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;

namespace Devliora.Application.Features.BlogPosts.Queries.GetBlogPostByIdAdmin;

public class GetBlogPostByIdAdminQuery : IRequest<BlogPostAdminDetailDto?>
{
    public Guid Id { get; set; }
}
