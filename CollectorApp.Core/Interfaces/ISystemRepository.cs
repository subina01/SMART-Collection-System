namespace CollectorApp.Core.Interfaces;

public interface ISystemRepository
{
    Task<IEnumerable<string>> GetUserDatabasesAsync(CancellationToken cancellationToken = default);
}
