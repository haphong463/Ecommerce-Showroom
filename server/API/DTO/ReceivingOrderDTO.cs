namespace API.DTO
{
    public class ReceivingOrderDTO
    {
        public int Id { get; set; }
        public int FrameNumber { get; set; }
        public int PurchaseOrderId { get; set; }
        public List<FrameBrief>? Frame { get; set; }
        public include_OrderCompany? OrderCompany { get; set; }
    }
}
