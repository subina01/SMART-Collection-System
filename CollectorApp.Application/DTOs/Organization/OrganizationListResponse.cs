namespace CollectorApp.Application.DTOs.Organization;

public sealed class OrganizationListResponse
{
    public int Sn { get; init; }
    public string OrgName { get; init; } = string.Empty;
    public string? Palika { get; init; }
    public string? Email { get; init; }
    public string? Mobile { get; init; }
    public string? TelNo { get; init; }
    public bool Active { get; init; }
}
