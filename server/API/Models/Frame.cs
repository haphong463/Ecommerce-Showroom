using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Frame
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FrameNumber { get; set; }
        public int VehicleId { get; set; }
        public int ReceivingOrderId { get; set; }
        public Vehicle? Vehicle { get; set; }
        public ReceivingOrder? ReceivingOrder { get; set; }
    }
}
