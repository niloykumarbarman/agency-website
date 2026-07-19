using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Queries.GetAllBlogPosts;

public class GetAllBlogPostsQuery : IRequest<List<BlogPostDto>>
{
}
