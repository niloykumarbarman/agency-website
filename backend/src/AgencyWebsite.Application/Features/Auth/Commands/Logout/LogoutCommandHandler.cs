using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Auth.Commands.Logout;

public class LogoutCommandHandler : IRequestHandler<LogoutCommand, LogoutResult>
{
    private readonly IAppDbContext _context;
    private readonly IRefreshTokenService _refreshTokenService;

    public LogoutCommandHandler(IAppDbContext context, IRefreshTokenService refreshTokenService)
    {
        _context = context;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<LogoutResult> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var tokenHash = _refreshTokenService.Hash(request.Token);

        var existingToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash && !rt.IsDeleted, cancellationToken);

        if (existingToken is not null && !existingToken.IsRevoked)
        {
            existingToken.IsRevoked = true;
            existingToken.RevokedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(cancellationToken);
        }

        return new LogoutResult { Success = true };
    }
}
