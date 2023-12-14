using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ReceivedVehicle
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string UniqueIdentifier { get; set; }
        public string? ExternalNumber { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Brand { get; set; }
    }
}
