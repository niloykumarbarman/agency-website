using MediatR;

namespace AgencyWebsite.Application.Features.ContactMessages.Commands.CreateContactMessage;

public class CreateContactMessageCommand : IRequest<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
}
