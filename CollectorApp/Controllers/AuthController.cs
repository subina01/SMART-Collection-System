using CollectorApp.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CollectorApp.Controllers;

/// <summary>
/// Handles authentication for admin users.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Authenticates an admin user and returns a JWT token.
    /// </summary>
    /// <param name="request">The user credentials (UserId and Password).</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A JWT token and the authenticated user's ID.</returns>
    /// <response code="200">Login successful — returns token and userId.</response>
    /// <response code="401">Invalid credentials.</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(request, cancellationToken);

        if (!result.IsSuccess)
            return Unauthorized(new { message = result.Error });

        return Ok(result.Value);
    }
}
