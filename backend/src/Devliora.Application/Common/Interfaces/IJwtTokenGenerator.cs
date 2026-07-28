using Devliora.Domain.Entities;

namespace Devliora.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(Admin admin);
}
