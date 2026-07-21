using AgencyWebsite.Domain.Common;
using AgencyWebsite.Domain.Enums;

namespace AgencyWebsite.Domain.Entities;

public class ConsultationRequest : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public ServiceInterest ServiceInterest { get; set; }
    public ProjectBudgetRange ProjectBudgetRange { get; set; }
    public DateTime? PreferredDate { get; set; }
    public PreferredTimeSlot PreferredTimeSlot { get; set; }
    public string AdditionalDetails { get; set; } = string.Empty;
    public ConsultationRequestStatus Status { get; set; } = ConsultationRequestStatus.New;
    public string IpAddress { get; set; } = string.Empty; // audit/rate-limit trail
}
