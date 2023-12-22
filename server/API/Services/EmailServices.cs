using System.Net.Mail;
using System.Net;

namespace API.Services
{
    public static class EmailServices
    {
        public static async Task SendEmail(string email, string body, string subject)
        {
            try
            {
                var fromAddress = new MailAddress("haphong2134@gmail.com", "Showroom");
                var toAddress = new MailAddress(email, "Showroom");
                const string fromPassword = "nfyr wdgm trma owas"; // Thay bằng mật khẩu email của bạn

                // Tạo nội dung email chứa URL xác minh




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
    }
}
