using MediatR;

namespace AgencyWebsite.Application.Features.Auth.Commands.Login;

public class LoginCommand : IRequest<LoginResult>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResult
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public string? ErrorMessage { get; set; }
}
