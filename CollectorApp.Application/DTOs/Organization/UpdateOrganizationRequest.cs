using System.ComponentModel.DataAnnotations;

namespace CollectorApp.Application.DTOs.Organization;

public sealed class UpdateOrganizationRequest
{
    [Required(ErrorMessage = "OrgName is required.")]
    [StringLength(200, ErrorMessage = "OrgName must not exceed 200 characters.")]
    public string OrgName { get; init; } = string.Empty;

    [Required(ErrorMessage = "DBName is required.")]
    [StringLength(60, ErrorMessage = "DBName must not exceed 60 characters.")]
    public string DbName { get; init; } = string.Empty;

    [StringLength(100, ErrorMessage = "Palika must not exceed 100 characters.")]
    public string? Palika { get; init; }

    public int? WardNo { get; init; }

    [StringLength(30, ErrorMessage = "TelNo must not exceed 30 characters.")]
    public string? TelNo { get; init; }

    [StringLength(15, ErrorMessage = "Mobile must not exceed 15 characters.")]
    public string? Mobile { get; init; }

    [StringLength(45, ErrorMessage = "Email must not exceed 45 characters.")]
    [EmailAddress(ErrorMessage = "Email is not a valid email address.")]
    public string? Email { get; init; }

    public int? Qty { get; init; }

    [Required(ErrorMessage = "OrgCode is required.")]
    [StringLength(30, ErrorMessage = "OrgCode must not exceed 30 characters.")]
    public string OrgCode { get; init; } = string.Empty;

    [Required(ErrorMessage = "OrgPassword is required.")]
    [StringLength(30, ErrorMessage = "OrgPassword must not exceed 30 characters.")]
    public string OrgPassword { get; init; } = string.Empty;

    public bool Active { get; init; } = true;
}
