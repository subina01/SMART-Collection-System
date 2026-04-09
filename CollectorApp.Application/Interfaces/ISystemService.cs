using CollectorApp.Application.Common;

namespace CollectorApp.Application.Interfaces;

public interface ISystemService
{
    Task<Result<IEnumerable<string>>> GetUserDatabasesAsync(CancellationToken cancellationToken = default);
}
