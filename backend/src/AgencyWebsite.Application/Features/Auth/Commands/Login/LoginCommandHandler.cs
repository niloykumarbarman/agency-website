using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResult>
{
    private readonly IAppDbContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly ICurrentUserService _currentUserService;

    public LoginCommandHandler(
        IAppDbContext context,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator,
        IRefreshTokenService refreshTokenService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _refreshTokenService = refreshTokenService;
        _currentUserService = currentUserService;
    }

    public async Task<LoginResult> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        const string genericError = "Invalid email or password.";

        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.Email == request.Email && !a.IsDeleted, cancellationToken);

        if (admin is null || !admin.IsActive)
        {
            return new LoginResult { Success = false, ErrorMessage = genericError };
        }

        if (!_passwordHasher.Verify(request.Password, admin.PasswordHash))
        {
            return new LoginResult { Success = false, ErrorMessage = genericError };
        }

        var token = _jwtTokenGenerator.GenerateToken(admin);

        var rawRefreshToken = _refreshTokenService.GenerateRawToken();
        var refreshTokenEntity = new AgencyWebsite.Domain.Entities.RefreshToken
        {
            AdminId = admin.Id,
            TokenHash = _refreshTokenService.Hash(rawRefreshToken),
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedByIp = _currentUserService.IpAddress
        };

        _context.RefreshTokens.Add(refreshTokenEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return new LoginResult { Success = true, Token = token, RefreshToken = rawRefreshToken };
    }
}
