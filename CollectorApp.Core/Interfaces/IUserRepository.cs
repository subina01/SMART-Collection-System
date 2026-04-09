using CollectorApp.Core.Entities;

namespace CollectorApp.Core.Interfaces;

public interface IUserRepository
{
    Task<User?> FindByUserIdAsync(string userId, CancellationToken cancellationToken = default);
}
