using CollectorApp.Core.Entities;

namespace CollectorApp.Core.Interfaces;

public interface IOrganizationRepository
{
    Task<IEnumerable<Organization>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<Organization>> SearchAsync(string query, CancellationToken cancellationToken = default);
    Task<Organization?> GetBySnAsync(int sn, CancellationToken cancellationToken = default);
    Task<bool> OrgCodeExistsAsync(string orgCode, int? excludeSn = null, CancellationToken cancellationToken = default);
    Task AddAsync(Organization organization, CancellationToken cancellationToken = default);
    Task UpdateAsync(Organization organization, CancellationToken cancellationToken = default);
    Task DeleteAsync(Organization organization, CancellationToken cancellationToken = default);
}
