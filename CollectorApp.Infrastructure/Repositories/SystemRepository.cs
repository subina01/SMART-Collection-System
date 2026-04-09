using CollectorApp.Core.Interfaces;
using CollectorApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CollectorApp.Infrastructure.Repositories;

public sealed class SystemRepository : ISystemRepository
{
    private readonly AppDbContext _context;

    public SystemRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<string>> GetUserDatabasesAsync(CancellationToken cancellationToken = default)
    {
        var databases = await _context.Database
            .SqlQueryRaw<string>(
                "SELECT name FROM sys.databases " +
                "WHERE name NOT IN ('master', 'model', 'msdb', 'tempdb') " +
                "ORDER BY name")
            .ToListAsync(cancellationToken);

        return databases;
    }
}
