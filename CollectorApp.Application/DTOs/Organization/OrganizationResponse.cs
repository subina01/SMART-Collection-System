namespace CollectorApp.Application.DTOs.Organization;

public sealed class OrganizationResponse
{
    public int Sn { get; init; }
    public DateTime Date { get; init; }
    public string OrgName { get; init; } = string.Empty;
    public string DbName { get; init; } = string.Empty;
    public string? Palika { get; init; }
    public int? WardNo { get; init; }
    public string? TelNo { get; init; }
    public string? Mobile { get; init; }
    public string? Email { get; init; }
    public int? Qty { get; init; }
    public string OrgCode { get; init; } = string.Empty;
    public string OrgPassword { get; init; } = string.Empty;
    public bool Active { get; init; }
}
