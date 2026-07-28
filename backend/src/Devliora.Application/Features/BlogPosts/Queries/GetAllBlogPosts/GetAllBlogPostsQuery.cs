using MediatR;

namespace Devliora.Application.Features.BlogPosts.Queries.GetAllBlogPosts;

public class GetAllBlogPostsQuery : IRequest<List<BlogPostDto>>
{
}
