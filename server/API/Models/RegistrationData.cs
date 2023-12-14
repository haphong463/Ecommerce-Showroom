using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class RegistrationData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int AccountId { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string RegistrationAuthority { get; set; }
        public Vehicle? Vehicle { get; set; }
        public Account? Account { get; set; }
    }
}
