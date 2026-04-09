using CollectorApp.Application.Common;
using CollectorApp.Application.Interfaces;
using CollectorApp.Core.Interfaces;

namespace CollectorApp.Application.Services;

public sealed class SystemService : ISystemService
{
    private readonly ISystemRepository _repository;

    public SystemService(ISystemRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IEnumerable<string>>> GetUserDatabasesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var databases = await _repository.GetUserDatabasesAsync(cancellationToken);
            return Result<IEnumerable<string>>.Success(databases);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<string>>.Failure(ex.Message);
        }
    }
}
