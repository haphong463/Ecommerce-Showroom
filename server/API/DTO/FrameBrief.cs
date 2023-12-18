namespace API.DTO
{
    public class FrameBrief
    {
        public int Id { get; set; }
        public int FrameNumber { get; set; }
        public string Description { get; set; }
        public int VehicleId { get; set; }
        public int ReceivingOrderId { get; set; }
    }
}
