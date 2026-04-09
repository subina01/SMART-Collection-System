using CollectorApp.Application.Common;
using CollectorApp.Application.DTOs;

namespace CollectorApp.Application.Interfaces;

public interface IAuthService
{
    Task<Result<LoginResponse>> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
}
