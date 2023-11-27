using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {


        private readonly DatabaseContext _dbContext;

        public AccountController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Accounts
        [HttpGet]
        public ActionResult<IEnumerable<Account>> GetAccounts()
        {
            return _dbContext.Accounts.ToList();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public ActionResult<Account> GetAccountById(int id)
        {
            var account = _dbContext.Accounts.Find(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // POST: api/Accounts
        [HttpPost]
        public ActionResult<Account> CreateAccount(Account account)
        {
            _dbContext.Accounts.Add(account);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public IActionResult UpdateAccount(int id, Account account)
        {
            if (id != account.AccountId)
            {
                return BadRequest();
            }

            _dbContext.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception)
            {
                if (!_dbContext.Accounts.Any(a => a.AccountId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(int id)
        {
            var account = _dbContext.Accounts.Find(id);

            if (account == null)
            {
                return NotFound();
            }

            _dbContext.Accounts.Remove(account);
            _dbContext.SaveChanges();

            return NoContent();
        }













    }
}
