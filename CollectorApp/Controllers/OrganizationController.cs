using CollectorApp.Application.DTOs.Organization;
using CollectorApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectorApp.Controllers;

[ApiController]
[Route("api/orgs")]
[Authorize]
public sealed class OrganizationController : ControllerBase
{
    private readonly IOrganizationService _organizationService;

    public OrganizationController(IOrganizationService organizationService)
    {
        _organizationService = organizationService;
    }

    [HttpGet("generate-credentials")]
    public async Task<IActionResult> GenerateCredentials([FromQuery] string orgName, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(orgName))
            return BadRequest(new { message = "orgName is required." });

        var result = await _organizationService.GenerateCredentialsAsync(orgName, cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrganizationRequest request, CancellationToken cancellationToken)
    {
        var result = await _organizationService.CreateAsync(request, cancellationToken);

        if (!result.IsSuccess)
            return BadRequest(new { message = result.Error });

        return StatusCode(201, result.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _organizationService.GetAllAsync(cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest(new { message = "Search query cannot be empty." });

        var result = await _organizationService.SearchAsync(q, cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var result = await _organizationService.GetByIdAsync(id, cancellationToken);

        if (!result.IsSuccess)
            return NotFound(new { message = result.Error });

        return Ok(result.Value);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateOrganizationRequest request, CancellationToken cancellationToken)
    {
        var result = await _organizationService.UpdateAsync(id, request, cancellationToken);

        if (!result.IsSuccess)
        {
            if (result.Error!.Contains("not found"))
                return NotFound(new { message = result.Error });

            return BadRequest(new { message = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var result = await _organizationService.DeleteAsync(id, cancellationToken);

        if (!result.IsSuccess)
        {
            if (result.Error!.Contains("not found"))
                return NotFound(new { message = result.Error });

            return StatusCode(500, new { message = result.Error });
        }

        return Ok(result.Value);
    }
}
