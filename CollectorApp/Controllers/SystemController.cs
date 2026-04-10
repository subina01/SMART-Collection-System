using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectorApp.Controllers;

/// <summary>
/// Provides system-level information such as available organization databases.
/// All endpoints require a valid JWT bearer token.
/// </summary>
[ApiController]
[Route("api/system")]
[Authorize]
[Produces("application/json")]
public sealed class SystemController : ControllerBase
{
    private readonly ISystemService _systemService;

    public SystemController(ISystemService systemService)
    {
        _systemService = systemService;
    }

    /// <summary>
    /// Returns the list of organization databases the current user has access to.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A list of database name strings.</returns>
    /// <response code="200">Database list retrieved successfully.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="500">An unexpected error occurred.</response>
    [HttpGet("databases")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetDatabases(CancellationToken cancellationToken)
    {
        var result = await _systemService.GetUserDatabasesAsync(cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }
}
