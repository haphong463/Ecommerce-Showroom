using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Account
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountId { get; set; }
        [Required, StringLength(50, MinimumLength = 10), Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [EmailAddress, Column(TypeName = "nvarchar(320)"), StringLength(320)]
        public string Email { get; set; }
        [Required, StringLength(100, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[\W_]).+$")]
        public string Password { get; set; }
        [Required, StringLength(11, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10,11}$")]
        public string Phone { get; set; }
        public string Address { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string? Role { get; set; }
        public string? AvatarUrl { get; set; }
        [Required, Column(TypeName = "nvarchar(20)")]
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }
        public List<Order>? Order { get; set; }
        public string? VerifitcationToken { get; set; }
        public DateTime? VerifiedAt { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }

    }
}
