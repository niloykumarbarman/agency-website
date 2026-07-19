using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.DeleteBlogPost;

public class DeleteBlogPostCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
