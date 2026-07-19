using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResult>
{
    private readonly IAppDbContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(
        IAppDbContext context,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
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
        return new LoginResult { Success = true, Token = token };
    }
}
