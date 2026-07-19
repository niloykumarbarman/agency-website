using AgencyWebsite.Domain.Entities;

namespace AgencyWebsite.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(Admin admin);
}
