using CollectorApp.Core.Entities;
using CollectorApp.Core.Interfaces;
using CollectorApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CollectorApp.Infrastructure.Repositories;

public sealed class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> FindByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _context.CollectionAppUsers
            .FirstOrDefaultAsync(u => u.UserId == userId, cancellationToken);
    }
}
