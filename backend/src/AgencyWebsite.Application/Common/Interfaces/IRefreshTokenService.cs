namespace AgencyWebsite.Application.Common.Interfaces;

public interface IRefreshTokenService
{
    string GenerateRawToken();
    string Hash(string rawToken);
}
