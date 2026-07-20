using MediatR;

namespace AgencyWebsite.Application.Features.Auth.Commands.RefreshToken;

public class RefreshTokenCommand : IRequest<RefreshTokenResult>
{
    public string Token { get; set; } = string.Empty;
}

public class RefreshTokenResult
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public string? ErrorMessage { get; set; }
}
