using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class ResetPass
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResetId { get; set; }

        [Required]
        public string Token { get; set; } = string.Empty;
        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
