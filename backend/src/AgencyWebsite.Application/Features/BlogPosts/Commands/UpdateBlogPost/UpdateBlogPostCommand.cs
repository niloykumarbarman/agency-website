using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.UpdateBlogPost;

public class UpdateBlogPostCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
}
