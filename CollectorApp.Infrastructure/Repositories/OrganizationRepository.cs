using CollectorApp.Core.Entities;
using CollectorApp.Core.Interfaces;
using CollectorApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CollectorApp.Infrastructure.Repositories;

public sealed class OrganizationRepository : IOrganizationRepository
{
    private readonly AppDbContext _context;

    public OrganizationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Organization>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Organizations
            .OrderBy(o => o.SN)
            .ToListAsync(cancellationToken);
    }

    public async Task<Organization?> GetBySnAsync(int sn, CancellationToken cancellationToken = default)
    {
        return await _context.Organizations
            .FirstOrDefaultAsync(o => o.SN == sn, cancellationToken);
    }

    public async Task<IEnumerable<Organization>> SearchAsync(string query, CancellationToken cancellationToken = default)
    {
        var q = query.ToLower();
        return await _context.Organizations
            .Where(o => o.OrgName.ToLower().Contains(q)
                     || (o.Palika != null && o.Palika.ToLower().Contains(q))
                     || (o.Email  != null && o.Email.ToLower().Contains(q))
                     || (o.Mobile != null && o.Mobile.Contains(q)))
            .OrderBy(o => o.SN)
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> OrgCodeExistsAsync(string orgCode, int? excludeSn = null, CancellationToken cancellationToken = default)
    {
        return await _context.Organizations
            .AnyAsync(o => o.OrgCode == orgCode && (excludeSn == null || o.SN != excludeSn), cancellationToken);
    }

    public async Task AddAsync(Organization organization, CancellationToken cancellationToken = default)
    {
        await _context.Organizations.AddAsync(organization, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Organization organization, CancellationToken cancellationToken = default)
    {
        _context.Organizations.Update(organization);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Organization organization, CancellationToken cancellationToken = default)
    {
        _context.Organizations.Remove(organization);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
