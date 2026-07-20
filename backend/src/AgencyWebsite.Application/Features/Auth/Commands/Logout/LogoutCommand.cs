using MediatR;

namespace AgencyWebsite.Application.Features.Auth.Commands.Logout;

public class LogoutCommand : IRequest<LogoutResult>
{
    public string Token { get; set; } = string.Empty;
}

public class LogoutResult
{
    public bool Success { get; set; }
}
