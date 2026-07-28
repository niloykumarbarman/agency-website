using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPostsAdmin;

public class GetAllBlogPostsAdminQuery : IRequest<List<BlogPostAdminDto>>
{
}
