using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Domain.Entities;

public class BlogPost : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
    public DateTime? PublishedAt { get; set; }
}
