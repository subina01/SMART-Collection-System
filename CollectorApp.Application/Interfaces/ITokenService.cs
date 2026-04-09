using CollectorApp.Core.Entities;

namespace CollectorApp.Application.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
