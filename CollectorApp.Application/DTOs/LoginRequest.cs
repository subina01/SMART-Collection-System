using System.ComponentModel.DataAnnotations;

namespace CollectorApp.Application.DTOs;

public sealed class LoginRequest
{
    [Required(ErrorMessage = "UserId is required.")]
    [StringLength(50, ErrorMessage = "UserId must not exceed 50 characters.")]
    public string UserId { get; init; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(30, ErrorMessage = "Password must not exceed 30 characters.")]
    public string Password { get; init; } = string.Empty;
}
