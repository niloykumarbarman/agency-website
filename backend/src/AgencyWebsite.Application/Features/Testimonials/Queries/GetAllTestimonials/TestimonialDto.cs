namespace AgencyWebsite.Application.Features.Testimonials.Queries.GetAllTestimonials;

public class TestimonialDto
{
    public Guid Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientTitle { get; set; } = string.Empty;
    public string ClientCompany { get; set; } = string.Empty;
    public string ClientPhotoUrl { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public int Rating { get; set; }
}
