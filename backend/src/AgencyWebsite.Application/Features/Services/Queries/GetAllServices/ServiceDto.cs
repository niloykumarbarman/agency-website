namespace AgencyWebsite.Application.Features.Services.Queries.GetAllServices;

public class ServiceDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
