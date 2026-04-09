namespace CollectorApp.Application.DTOs.Organization;

public sealed class GenerateCredentialsResponse
{
    public string OrgCode { get; init; } = string.Empty;
    public string OrgPassword { get; init; } = string.Empty;
}
