using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CollectorApp.Application.Common;
using CollectorApp.Application.Interfaces;
using CollectorApp.Core.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CollectorApp.Infrastructure.Services;

public sealed class JwtTokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public JwtTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration[AppConstants.Jwt.Key]!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration[AppConstants.Jwt.Issuer],
            audience: _configuration[AppConstants.Jwt.Audience],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                double.Parse(_configuration[AppConstants.Jwt.ExpiresInMinutes]!)),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
