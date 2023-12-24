namespace API.DTO
{
    public class ReceivingOrderDTO
    {
        public int Id { get; set; }
        public int PurchaseOrderId { get; set; }
        public DateTime ReceivedDate { get; set; }
        public List<FrameBrief> Frames { get; set; }
    }
}
