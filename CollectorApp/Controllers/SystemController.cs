namespace CollectorApp.Controllers;

[ApiController]
[Route("api/system")]
[Authorize]
public sealed class SystemController : ControllerBase
{
    private readonly ISystemService _systemService;

    public SystemController(ISystemService systemService)
    {
        _systemService = systemService;
    }

    [HttpGet("databases")]
    public async Task<IActionResult> GetDatabases(CancellationToken cancellationToken)
    {
        var result = await _systemService.GetUserDatabasesAsync(cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }
}
