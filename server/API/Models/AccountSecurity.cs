using BCrypt.Net;

namespace API.Models
{
    public static class AccountSecurity
    {
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }

        public static bool VerifyPassword(string enterPassword, string storeHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(enterPassword, storeHash);
        }
    }
}