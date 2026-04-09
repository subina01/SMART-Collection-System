namespace CollectorApp.Application.DTOs;

public sealed class LoginResponse
{
    public string Token { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
}
