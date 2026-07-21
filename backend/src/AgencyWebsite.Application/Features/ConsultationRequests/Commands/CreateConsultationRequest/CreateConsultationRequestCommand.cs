using AgencyWebsite.Domain.Enums;
using MediatR;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Commands.CreateConsultationRequest;

public class CreateConsultationRequestCommand : IRequest<Guid>
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
    public string IpAddress { get; set; } = string.Empty;
}
