using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Frame
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int FrameNumber { get; set; }
        public string Description { get; set; }
        public int VehicleId { get; set; }
        public int OrderCompanyId { get; set; }
        public Vehicle? Vehicle { get; set; }
        public OrderCompany? OrderCompany { get; set; }
    }
}
