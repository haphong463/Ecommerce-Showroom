using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Images
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ImageId { get; set; }
        public int VehicleId { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public Vehicle? Vehicle { get; set; }
    }
}
