using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Auth.Commands.RefreshToken;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResult>
{
    private readonly IAppDbContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly ICurrentUserService _currentUserService;

    public RefreshTokenCommandHandler(
        IAppDbContext context,
        IJwtTokenGenerator jwtTokenGenerator,
        IRefreshTokenService refreshTokenService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
        _refreshTokenService = refreshTokenService;
        _currentUserService = currentUserService;
    }

    public async Task<RefreshTokenResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        const string genericError = "Invalid or expired refresh token.";

        var tokenHash = _refreshTokenService.Hash(request.Token);

        var existingToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash && !rt.IsDeleted, cancellationToken);

        if (existingToken is null || existingToken.IsRevoked || existingToken.ExpiresAt < DateTime.UtcNow)
        {
            return new RefreshTokenResult { Success = false, ErrorMessage = genericError };
        }

        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.Id == existingToken.AdminId && !a.IsDeleted, cancellationToken);

        if (admin is null || !admin.IsActive)
        {
            return new RefreshTokenResult { Success = false, ErrorMessage = genericError };
        }

        var newRawRefreshToken = _refreshTokenService.GenerateRawToken();
        var newTokenHash = _refreshTokenService.Hash(newRawRefreshToken);

        existingToken.IsRevoked = true;
        existingToken.RevokedAt = DateTime.UtcNow;
        existingToken.ReplacedByTokenHash = newTokenHash;

        var newRefreshTokenEntity = new AgencyWebsite.Domain.Entities.RefreshToken
        {
            AdminId = admin.Id,
            TokenHash = newTokenHash,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedByIp = _currentUserService.IpAddress
        };

        _context.RefreshTokens.Add(newRefreshTokenEntity);

        var newAccessToken = _jwtTokenGenerator.GenerateToken(admin);

        await _context.SaveChangesAsync(cancellationToken);

        return new RefreshTokenResult { Success = true, Token = newAccessToken, RefreshToken = newRawRefreshToken };
    }
}
