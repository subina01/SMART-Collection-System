using CollectorApp.Application.DTOs.Organization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectorApp.Controllers;

/// <summary>
/// Manages organizations in the SMART Collection System.
/// All endpoints require a valid JWT bearer token.
/// </summary>
[ApiController]
[Route("api/orgs")]
[Authorize]
[Produces("application/json")]
public sealed class OrganizationController : ControllerBase
{
    private readonly IOrganizationService _organizationService;

    public OrganizationController(IOrganizationService organizationService)
    {
        _organizationService = organizationService;
    }

    /// <summary>
    /// Generates a unique OrgCode and OrgPassword for a given organization name.
    /// </summary>
    /// <param name="orgName">The name of the organization to generate credentials for.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Generated OrgCode and OrgPassword.</returns>
    /// <response code="200">Credentials generated successfully.</response>
    /// <response code="400">orgName query parameter is missing or empty.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="500">An unexpected error occurred.</response>
    [HttpGet("generate-credentials")]
    [ProducesResponseType(typeof(GenerateCredentialsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GenerateCredentials([FromQuery] string orgName, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(orgName))
            return BadRequest(new { message = "orgName is required." });

        var result = await _organizationService.GenerateCredentialsAsync(orgName, cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new organization.
    /// </summary>
    /// <param name="request">Organization details including name, database name, contact info, and credentials.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The newly created organization.</returns>
    /// <response code="201">Organization created successfully.</response>
    /// <response code="400">Validation error or duplicate entry.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    [HttpPost]
    [ProducesResponseType(typeof(OrganizationResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateOrganizationRequest request, CancellationToken cancellationToken)
    {
        var result = await _organizationService.CreateAsync(request, cancellationToken);

        if (!result.IsSuccess)
            return BadRequest(new { message = result.Error });

        return StatusCode(201, result.Value);
    }

    /// <summary>
    /// Returns a list of all organizations.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A list of organizations with basic info.</returns>
    /// <response code="200">Organizations retrieved successfully.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="500">An unexpected error occurred.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<OrganizationListResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _organizationService.GetAllAsync(cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Searches organizations by name, palika, email, or mobile.
    /// </summary>
    /// <param name="q">The search query string.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A filtered list of matching organizations.</returns>
    /// <response code="200">Search completed successfully.</response>
    /// <response code="400">Search query is empty.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="500">An unexpected error occurred.</response>
    [HttpGet("search")]
    [ProducesResponseType(typeof(IEnumerable<OrganizationListResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Search([FromQuery] string q, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest(new { message = "Search query cannot be empty." });

        var result = await _organizationService.SearchAsync(q, cancellationToken);

        if (!result.IsSuccess)
            return StatusCode(500, new { message = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Returns the full details of a single organization by its ID.
    /// </summary>
    /// <param name="id">The unique integer ID of the organization.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Full organization details.</returns>
    /// <response code="200">Organization found and returned.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="404">No organization found with the given ID.</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(OrganizationResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var result = await _organizationService.GetByIdAsync(id, cancellationToken);

        if (!result.IsSuccess)
            return NotFound(new { message = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Updates an existing organization.
    /// </summary>
    /// <param name="id">The unique integer ID of the organization to update.</param>
    /// <param name="request">Updated organization details.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The updated organization.</returns>
    /// <response code="200">Organization updated successfully.</response>
    /// <response code="400">Validation error.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="404">No organization found with the given ID.</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(OrganizationResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
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

    /// <summary>
    /// Deletes an organization by its ID.
    /// </summary>
    /// <param name="id">The unique integer ID of the organization to delete.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A confirmation message.</returns>
    /// <response code="200">Organization deleted successfully.</response>
    /// <response code="401">Missing or invalid JWT token.</response>
    /// <response code="404">No organization found with the given ID.</response>
    /// <response code="500">An unexpected error occurred.</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status500InternalServerError)]
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
