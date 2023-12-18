using API.Models;

namespace API.DTO
{
    public class FrameDTO
    {
        public int Id { get; set; }
        public int FrameNumber { get; set; }
        public int VehicleId { get; set; }
        public int ReceivingOrderId { get; set; }
        public include_VehicleDTO? Vehicle { get; set; }
        public include_ReceivingOdDTO? Receiving_order { get; set; }
    }
}
