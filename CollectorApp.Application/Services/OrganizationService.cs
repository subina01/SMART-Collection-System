using CollectorApp.Application.Common;
using CollectorApp.Application.DTOs.Organization;
using CollectorApp.Application.Interfaces;
using CollectorApp.Core.Entities;
using CollectorApp.Core.Interfaces;

namespace CollectorApp.Application.Services;

public sealed class OrganizationService : IOrganizationService
{
    private readonly IOrganizationRepository _repository;

    public OrganizationService(IOrganizationRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IEnumerable<OrganizationListResponse>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var organizations = await _repository.GetAllAsync(cancellationToken);
            var response = organizations.Select(org => new OrganizationListResponse
            {
                Sn = org.SN,
                OrgName = org.OrgName,
                Palika = org.Palika,
                Email = org.Email,
                Mobile = org.Mobile,
                TelNo = org.TelNo,
                Active = org.Active
            });
            return Result<IEnumerable<OrganizationListResponse>>.Success(response);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<OrganizationListResponse>>.Failure(ex.Message);
        }
    }

    public async Task<Result<IEnumerable<OrganizationListResponse>>> SearchAsync(string query, CancellationToken cancellationToken = default)
    {
        try
        {
            var organizations = await _repository.SearchAsync(query, cancellationToken);
            var response = organizations.Select(org => new OrganizationListResponse
            {
                Sn = org.SN,
                OrgName = org.OrgName,
                Palika = org.Palika,
                Email = org.Email,
                Mobile = org.Mobile,
                TelNo = org.TelNo,
                Active = org.Active
            });
            return Result<IEnumerable<OrganizationListResponse>>.Success(response);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<OrganizationListResponse>>.Failure(ex.Message);
        }
    }

    public async Task<Result<OrganizationResponse>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        try
        {
            var organization = await _repository.GetBySnAsync(id, cancellationToken);
            if (organization is null)
                return Result<OrganizationResponse>.Failure($"Organization with ID {id} not found.");

            return Result<OrganizationResponse>.Success(ToResponse(organization));
        }
        catch (Exception ex)
        {
            return Result<OrganizationResponse>.Failure(ex.Message);
        }
    }

    public async Task<Result<MessageResponse>> CreateAsync(CreateOrganizationRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var codeExists = await _repository.OrgCodeExistsAsync(request.OrgCode, null, cancellationToken);
            if (codeExists)
                return Result<MessageResponse>.Failure($"OrgCode '{request.OrgCode}' is already in use.");

            var organization = Organization.Create(
                request.OrgName, request.DbName, request.OrgCode, request.OrgPassword,
                request.Palika, request.WardNo, request.TelNo, request.Mobile,
                request.Email, request.Qty, request.Active);

            await _repository.AddAsync(organization, cancellationToken);
            return Result<MessageResponse>.Success(new MessageResponse { Message = "Organization created successfully" });
        }
        catch (Exception ex)
        {
            return Result<MessageResponse>.Failure(ex.Message);
        }
    }

    public async Task<Result<MessageResponse>> UpdateAsync(int id, UpdateOrganizationRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var organization = await _repository.GetBySnAsync(id, cancellationToken);
            if (organization is null)
                return Result<MessageResponse>.Failure($"Organization with ID {id} not found.");

            var codeExists = await _repository.OrgCodeExistsAsync(request.OrgCode, id, cancellationToken);
            if (codeExists)
                return Result<MessageResponse>.Failure($"OrgCode '{request.OrgCode}' is already in use.");

            organization.Update(
                request.OrgName, request.DbName, request.OrgCode, request.OrgPassword,
                request.Palika, request.WardNo, request.TelNo, request.Mobile,
                request.Email, request.Qty, request.Active);

            await _repository.UpdateAsync(organization, cancellationToken);
            return Result<MessageResponse>.Success(new MessageResponse { Message = "Organization updated successfully" });
        }
        catch (Exception ex)
        {
            return Result<MessageResponse>.Failure(ex.Message);
        }
    }

    public async Task<Result<MessageResponse>> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        try
        {
            var organization = await _repository.GetBySnAsync(id, cancellationToken);
            if (organization is null)
                return Result<MessageResponse>.Failure($"Organization with ID {id} not found.");

            organization.Deactivate();
            await _repository.UpdateAsync(organization, cancellationToken);
            return Result<MessageResponse>.Success(new MessageResponse { Message = "Organization deactivated successfully" });
        }
        catch (Exception ex)
        {
            return Result<MessageResponse>.Failure(ex.Message);
        }
    }

    public async Task<Result<GenerateCredentialsResponse>> GenerateCredentialsAsync(string orgName, CancellationToken cancellationToken = default)
    {
        try
        {
            var baseCode = orgName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries)[0].ToUpperInvariant();

            var orgCode = baseCode;
            var suffix = 2;
            while (await _repository.OrgCodeExistsAsync(orgCode, null, cancellationToken))
            {
                orgCode = $"{baseCode}{suffix}";
                suffix++;
            }

            var password = GeneratePassword();

            return Result<GenerateCredentialsResponse>.Success(new GenerateCredentialsResponse
            {
                OrgCode = orgCode,
                OrgPassword = password,
            });
        }
        catch (Exception ex)
        {
            return Result<GenerateCredentialsResponse>.Failure(ex.Message);
        }
    }

    private static string GeneratePassword()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        return new string(Enumerable.Range(0, 6).Select(_ => chars[random.Next(chars.Length)]).ToArray());
    }

    private static OrganizationResponse ToResponse(Organization org) => new()
    {
        Sn = org.SN,
        Date = org.Date,
        OrgName = org.OrgName,
        DbName = org.DBName,
        Palika = org.Palika,
        WardNo = org.WardNo,
        TelNo = org.TelNo,
        Mobile = org.Mobile,
        Email = org.Email,
        Qty = org.Qty,
        OrgCode = org.OrgCode,
        OrgPassword = org.OrgPassword,
        Active = org.Active
    };
}
