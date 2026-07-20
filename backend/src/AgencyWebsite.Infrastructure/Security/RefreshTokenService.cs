using System.Security.Cryptography;
using System.Text;
using AgencyWebsite.Application.Common.Interfaces;

namespace AgencyWebsite.Infrastructure.Security;

public class RefreshTokenService : IRefreshTokenService
{
    public string GenerateRawToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes)
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "");
    }

    public string Hash(string rawToken)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(rawToken));
        return Convert.ToHexString(bytes);
    }
}
