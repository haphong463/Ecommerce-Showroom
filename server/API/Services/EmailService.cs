using MailKit.Net.Smtp;
using MimeKit;
using System;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void SendVerificationEmail(string userEmail, string verificationLink)
    {
        // Đọc thông tin cấu hình SMTP từ appsettings.json
        string smtpServer = _configuration["SmtpSettings:Server"];
        int smtpPort = Convert.ToInt32(_configuration["SmtpSettings:Port"]);
        bool useSsl = Convert.ToBoolean(_configuration["SmtpSettings:UseSsl"]);
        string username = _configuration["SmtpSettings:Username"];
        string password = _configuration["SmtpSettings:Password"];

        // Sử dụng thông tin cấu hình từ appsettings.json để kết nối và gửi email
        using var client = new SmtpClient();
        client.Connect(smtpServer, smtpPort, useSsl);
        client.Authenticate(username, password);

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Showroom", "vuongyennhi0912@gmail.com"));
        message.To.Add(MailboxAddress.Parse(userEmail));
        message.Subject = "Verify email address";

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = $"<p>Hello,</p><p>Please click <a href='{verificationLink}'>here</a> to verify your email address.</p>";

        message.Body = bodyBuilder.ToMessageBody();

        // Gửi email bằng client đã kết nối
        client.Send(message);
        client.Disconnect(true);
    }

}
