using API.Data;
using API.Helper;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _dbContext;

        public AuthController(IConfiguration configuration, DatabaseContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;

        }

        [HttpPost("login")]
        public IActionResult Login([FromForm] AccountCredentials credentials)
        {
            var user = Authenticate(credentials);
            if (user != null)
            {
                if (user.VerifiedAt != null) // Kiểm tra trạng thái xác minh email
                {
                    var tokenString = TokenService.GenerateJSONWebToken(_configuration, user);
                    return Ok(new { Token = tokenString });
                }
                else
                {
                    return BadRequest("Please verify your email to login.");
                }
            }
            return Unauthorized();
        }



        // To authenticate user
        private Account Authenticate(AccountCredentials userCredentials)
        {
            var storedUser = _dbContext.Accounts.FirstOrDefault(x => x.Email.ToLower() == userCredentials.Email.ToLower());

            if (storedUser != null && AccountSecurity.VerifyPassword(userCredentials.Password, storedUser.Password))
            {
                return storedUser;
            }

            return null;
        }




    }
}
