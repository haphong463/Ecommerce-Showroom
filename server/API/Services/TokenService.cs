using API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService
    {
        public static string GenerateJSONWebToken(IConfiguration configuration, Account account)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
{
    new Claim("Email", account.Email),
    new Claim("Id", account.AccountId.ToString()),
    new Claim(ClaimTypes.Role, account.Role),
    new Claim("Role", account.Role),
    new Claim("Name", account.Name),
};

            if (account.AvatarUrl != null)
            {
                claims.Add(new Claim("Avatar", account.AvatarUrl));
            }

            var claimsArray = claims.ToArray();


            var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
