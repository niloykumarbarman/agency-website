using MediatR;

namespace Devliora.Application.Features.BlogPosts.Commands.DeleteBlogPost;

public class DeleteBlogPostCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
