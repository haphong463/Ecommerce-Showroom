using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _dbContext;

        public AccountController(DatabaseContext dbContext, IWebHostEnvironment env)
        {
            _dbContext = dbContext;
            _env = env;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> Index()
        {
            try
            {
                var accounts = await _dbContext.Accounts.ToListAsync();

                if (accounts != null && accounts.Any())
                {
                    return Ok(new ApiResponse<List<Account>>(accounts, "Successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(null, "No accounts found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);
            }
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Account>>> GetAccount(int id)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account == null)
                {
                    return Ok(new ApiResponse<Account>(null, "Account not found"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(account, "Get account successfully"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);

            }
        }


        [HttpPost]
        public async Task<ActionResult<ApiResponse<Account>>> AddAccount([FromForm] Account account, IFormFile file)
        {
            try
            {
                account.Password = AccountSecurity.HashPassword(account.Password);


                if (account.Role == null)
                {
                    account.Role = "User";
                }
                account.AvatarUrl = FileUpload.SaveImage("AccountImage", file);

                var resource = await _dbContext.Accounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();

                if (resource != null)
                {
                    return Ok(new ApiResponse<Account>(account, "Resource created"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(null, "Unable to create resource"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account != null)
                {
                    if (account.AvatarUrl != null)
                    {
                        // Xoá hình ảnh
                        FileUpload.DeleteImage(account.AvatarUrl, _env);
                    }
                    _dbContext.Accounts.Remove(account);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Account>(account, "Delete account successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<Account>(null, "Account not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);

            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromForm] Account account, IFormFile? file)
        {
            try
            {
                var existingAccount = await _dbContext.Accounts.FindAsync(id);

                if (existingAccount != null)
                {
                    // Kiểm tra từng trường và cập nhật chỉ khi có giá trị thay đổi
                    if (!string.IsNullOrWhiteSpace(account.Password))
                    {
                        existingAccount.Password = AccountSecurity.HashPassword(account.Password);
                    }
                    if (file != null)
                    {
                        if (!string.IsNullOrWhiteSpace(existingAccount.AvatarUrl))
                        {
                            // Xoá hình ảnh cũ
                            FileUpload.DeleteImage(existingAccount.AvatarUrl, _env);
                        }
                        existingAccount.AvatarUrl = FileUpload.SaveImage("AccountImage", file);
                    }
                    if (!string.IsNullOrWhiteSpace(account.Name))
                    {
                        existingAccount.Name = account.Name;
                    }
                    if (!string.IsNullOrWhiteSpace(account.Email))
                    {
                        existingAccount.Email = account.Email;
                    }
                    // Cập nhật các trường khác tương tự ...

                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Account>(existingAccount, "Update account successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(account, "Account not found to update"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);
            }
        }

    }
}