using MediatR;

namespace Devliora.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;

public class GetAllBlogPostsAdminQuery : IRequest<List<BlogPostAdminDto>>
{
}
