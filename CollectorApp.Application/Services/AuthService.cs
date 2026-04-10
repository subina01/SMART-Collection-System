using CollectorApp.Application.DTOs;
using CollectorApp.Application.Interfaces;
using CollectorApp.Core.Exceptions;
using CollectorApp.Core.ValueObjects;

namespace CollectorApp.Application.Services;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<Result<LoginResponse>> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            UsernameValue.Create(request.UserId);
            PasswordValue.Create(request.Password);

            var user = await _userRepository.FindByUserIdAsync(request.UserId, cancellationToken);
            if (user is null || user.Password != request.Password)
                throw new InvalidCredentialsException();

            var token = _tokenService.GenerateToken(user);

            return Result<LoginResponse>.Success(new LoginResponse
            {
                Token = token,
                UserId = user.UserId
            });
        }
        catch (ArgumentException ex)
        {
            return Result<LoginResponse>.Failure(ex.Message);
        }
        catch (InvalidCredentialsException ex)
        {
            return Result<LoginResponse>.Failure(ex.Message);
        }
    }
}
