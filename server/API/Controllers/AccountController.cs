using API.Data;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using crypto;
using System.Net;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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



        public class AccountResponse
        {
            public int AccountId { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string? AvatarUrl { get; set; }
            public string Gender { get; set; }
            public DateTime DateOfBirth { get; set; }
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<AccountResponse>>> GetAccount(int id)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account == null)
                {
                    return Ok(new ApiResponse<AccountResponse>(null, "Account not found"));
                }
                else
                {
                    var accountResponse = new AccountResponse
                    {
                        AccountId = account.AccountId,
                        Name = account.Name,
                        Email = account.Email,
                        Phone = account.Phone,
                        AvatarUrl = account.AvatarUrl,
                        Gender = account.Gender,
                        DateOfBirth = account.DateOfBirth,

                        // Bổ sung các trường khác từ Account mà bạn muốn bao gồm trong AccountResponse ở đây
                        // Bỏ qua các trường không cần thiết như Password, Token, ...
                    };

                    return Ok(new ApiResponse<AccountResponse>(accountResponse, "Get account successfully"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<AccountResponse>.Exception(ex);
            }
        }


        [HttpPost]
        public async Task<ActionResult<ApiResponse<Account>>> AddAccount([FromForm] Account account, IFormFile? file)
        {
            try
            {
                var existingEmail = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Email == account.Email);

                if (existingEmail != null)
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

                account.VerifitcationToken = CreateRandomToken();

                // Lưu tài khoản mới vào cơ sở dữ liệu
                var resource = await _dbContext.Accounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();


                // Tạo URL xác minh
                var verificationUrl = Url.Action("VerifyEmail", "Account", new { token = account.VerifitcationToken }, Request.Scheme);

                // Gửi email xác minh
                await SendVerificationEmail(account.Email, verificationUrl);


                if (account.Role == "Employee" || account.Role == "Admin")
                {
                    var newEmployee = new Employee
                    {
                        AccountId = account.AccountId,
                        Name = account.Name// Sử dụng AccountID từ tài khoản mới tạo
                                           // Các trường khác của Employee có thể được cập nhật tùy thuộc vào yêu cầu của bạn
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


        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(string token)
        {
            try
            {
                var account = await _dbContext.Accounts.FirstOrDefaultAsync(x => x.VerifitcationToken == token);
                if (account == null)
                {
                    return BadRequest("Invalid token");
                }

                // Xác minh email thành công: thực hiện các hành động cần thiết
                // Đánh dấu email đã được xác minh, lưu thông tin xác minh thời gian, v.v.
                account.VerifiedAt = DateTime.Now;
                await _dbContext.SaveChangesAsync();
                return Redirect($"http://localhost:3000/login?verify={account.VerifitcationToken}");
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);
            }
        }


        [HttpGet("verify/{token}")]
        public async Task<IActionResult> GetAccountByToken(string token)
        {
            try
            {
                var account = await _dbContext.Accounts.FirstOrDefaultAsync(x => x.VerifitcationToken == token);
                if (account == null)
                {
                    return BadRequest("Invalid token");
                }

                // Xác minh email thành công: thực hiện các hành động cần thiết
                // Đánh dấu email đã được xác minh, lưu thông tin xác minh thời gian, v.v.
                return Ok(new ApiResponse<Account>(account, "Resource created"));
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



        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromForm] string email)
        {
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(x => x.Email == email);
            if (account == null)
            {
                return Ok(new ApiResponse<Account>(account, "Account not found"));

            }

            account.PasswordResetToken = CreateRandomToken();
            account.ResetTokenExpires = DateTime.Now.AddDays(1);
            await _dbContext.SaveChangesAsync();
            return Ok(new ApiResponse<Account>(account, "You may now reset your password"));

        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPass request)
        {
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(x => x.PasswordResetToken == request.Token);
            if (account == null || account.ResetTokenExpires < DateTime.Now)
            {
                return Ok(new ApiResponse<Account>(account, "Invalid token"));

            }
            account.Password = AccountSecurity.HashPassword(request.Password);
            account.PasswordResetToken = null;
            account.ResetTokenExpires = null;
            await _dbContext.SaveChangesAsync();
            return Ok(new ApiResponse<Account>(account, "Password successfully reset"));
        }




        private async Task SendVerificationEmail(string email, string verificationUrl)
        {
            try
            {
                var fromAddress = new MailAddress("haphong2134@gmail.com", "Showroom");
                var toAddress = new MailAddress(email, "Showroom");
                const string fromPassword = "nfyr wdgm trma owas"; // Thay bằng mật khẩu email của bạn
                const string subject = "Verify Your Email";

                // Tạo nội dung email chứa URL xác minh
                string body = $@"
    <html>
    <head>
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }}

            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }}

            h2 {{
                color: #333333;
            }}

            p {{
                color: #555555;
            }}

            a {{
                color: #007BFF;
                text-decoration: none;
            }}

            a:hover {{
                text-decoration: underline;
            }}

            .logo {{
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Hello,</h2>
            <p>Please click <a href='{verificationUrl}'>here</a> to verify your email address.</p>
        </div>
    </body>
    </html>
";



                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com", // Thay bằng địa chỉ SMTP của bạn
                    Port = 587, // Thay đổi cổng nếu cần
                    EnableSsl = true, // Sử dụng SSL/TLS, thay đổi nếu không cần
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };

                using var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                await smtp.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khi gửi email
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }

        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromForm] ChangePasswordRequest request)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account == null)
                {
                    return Ok(new ApiResponse<Account>(null, "Account not found"));
                }

                // Check if the provided old password matches the stored password
                if (!AccountSecurity.VerifyPassword(request.OldPassword, account.Password))
                {
                    return Ok(new ApiResponse<Account>(null, "Incorrect old password"));
                }

                // Update the password with the new one
                account.Password = AccountSecurity.HashPassword(request.NewPassword);
                await _dbContext.SaveChangesAsync();

                return Ok(new ApiResponse<Account>(account, "Password changed successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);
            }
        }



        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }



    }
}
