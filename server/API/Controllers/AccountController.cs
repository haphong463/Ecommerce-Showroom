using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using API.Services;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _dbContext;



        private readonly EmailService _emailService;

        public AccountController(DatabaseContext dbContext, IWebHostEnvironment env)
        {
            _dbContext = dbContext;
            _env = env;
            IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _emailService = new EmailService(configuration);
        }

        [HttpGet]
        //[Authorize(Roles = "Admin,User")]
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
        public async Task<ActionResult<ApiResponse<Account>>> AddAccount([FromForm] Account account, IFormFile? file)
        {
            try
            {
                var existingAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Email == account.Email);

                if (existingAccount != null)
                {
                    // Trả về thông báo lỗi hoặc thông báo rằng địa chỉ email đã tồn tại
                    return Ok(new ApiResponse<Account>(null, "Email already exists"));
                }
                account.Password = AccountSecurity.HashPassword(account.Password);

                if (account.Role == null)
                {
                    account.Role = "User";
                }
                if (file != null)
                {
                    account.AvatarUrl = FileUpload.SaveImage("AccountImage", file);

                }

                // Lưu tài khoản mới vào cơ sở dữ liệu
                var resource = await _dbContext.Accounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();

                var verificationLink = GenerateVerificationLink(account.AccountId); // Thay accountId bằng thuộc tính tương ứng trong tài khoản của bạn
                _emailService.SendVerificationEmail(account.Email, verificationLink);



                if (account.Role == "Employee")
                {
                    var newEmployee = new Employee
                    {
                        AccountId = account.AccountId, // Sử dụng AccountID từ tài khoản mới tạo
                        Name = account.Name            // Các trường khác của Employee có thể được cập nhật tùy thuộc vào yêu cầu của bạn
                    };

                    _dbContext.Employees.Add(newEmployee);
                    await _dbContext.SaveChangesAsync();
                }




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




        private string GenerateVerificationLink(int userId)
        {
            // Tạo một mã xác thực ngẫu nhiên, bạn có thể sử dụng các thư viện mã hóa hoặc mã ngẫu nhiên có sẵn
            string verificationCode = GenerateRandomCode(); // Hàm tạo mã ngẫu nhiên, ví dụ: GenerateRandomCode()

            // Tạo liên kết xác minh với userId và verificationCode
            string verificationLink = $"http://localhost:3000/login{userId}/{verificationCode}";

            return verificationLink;
        }

        private string GenerateRandomCode()
        {
            // Logic để tạo mã xác thực ngẫu nhiên, ví dụ sử dụng thư viện Guid
            return Guid.NewGuid().ToString(); // Trả về một chuỗi GUID ngẫu nhiên
        }


        [HttpGet("verify-email")]
        public IActionResult VerifyEmail(int userId)
        {
            var user = _dbContext.Accounts.FirstOrDefault(x => x.AccountId == userId);
            if (user != null)
            {
                // Cập nhật trạng thái xác minh email
                user.VerifiedAt = DateTime.UtcNow; // Đặt thời gian xác minh thành thời gian hiện tại
                _dbContext.SaveChanges();
                return Ok("Email verification successful.");
            }
            return NotFound("User not found.");
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
                var existingEmail = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Email == account.Email);

                if (existingEmail != null)
                {
                    // Trả về thông báo lỗi hoặc thông báo rằng địa chỉ email đã tồn tại
                    return Ok(new ApiResponse<Account>(null, "Email already exists"));
                }
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
