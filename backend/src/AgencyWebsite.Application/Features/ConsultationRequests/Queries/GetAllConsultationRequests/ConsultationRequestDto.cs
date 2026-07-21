namespace AgencyWebsite.Application.Features.ConsultationRequests.Queries.GetAllConsultationRequests;

public class ConsultationRequestDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string ServiceInterest { get; set; } = string.Empty;
    public string ProjectBudgetRange { get; set; } = string.Empty;
    public DateTime? PreferredDate { get; set; }
    public string PreferredTimeSlot { get; set; } = string.Empty;
    public string AdditionalDetails { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
