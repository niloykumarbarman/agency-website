namespace Devliora.Application.Features.BlogPosts.Queries.GetBlogPostByIdAdmin;

public class BlogPostAdminDetailDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public DateTime? PublishedAt { get; set; }
    public string Status { get; set; } = string.Empty;
}
