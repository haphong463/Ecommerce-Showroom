using API.Data;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPost]
        public IActionResult Login([FromBody] AccountCredentials credentials)
        {

            var user = Authenticate(credentials);
            if (user != null)
            {
                var tokenString = TokenService.GenerateJSONWebToken
                        (_configuration, user);
                return Ok(new { Token = tokenString });

            }
            return Unauthorized();
        }
        //To authenticate user
        private Account Authenticate(AccountCredentials userCredentials)
        {
            var currentUser = _dbContext.Accounts.FirstOrDefault
                (x => x.Email.ToLower() == userCredentials.Email.ToLower()
                      && x.Password == userCredentials.Password);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

    }

}
