using CollectorApp.Application.Common;
using CollectorApp.Application.DTOs.Organization;

namespace CollectorApp.Application.Interfaces;

public interface IOrganizationService
{
    Task<Result<IEnumerable<OrganizationListResponse>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Result<IEnumerable<OrganizationListResponse>>> SearchAsync(string query, CancellationToken cancellationToken = default);
    Task<Result<OrganizationResponse>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Result<MessageResponse>> CreateAsync(CreateOrganizationRequest request, CancellationToken cancellationToken = default);
    Task<Result<MessageResponse>> UpdateAsync(int id, UpdateOrganizationRequest request, CancellationToken cancellationToken = default);
    Task<Result<MessageResponse>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<Result<GenerateCredentialsResponse>> GenerateCredentialsAsync(string orgName, CancellationToken cancellationToken = default);
}
