using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.CreateBlogPost;

public class CreateBlogPostCommand : IRequest<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
}
