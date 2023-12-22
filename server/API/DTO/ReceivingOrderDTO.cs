namespace API.DTO
{
    public class ReceivingOrderDTO
    {
        public int PurchaseOrderId { get; set; }
        public List<FrameBrief> Frames { get; set; }
    }
}
