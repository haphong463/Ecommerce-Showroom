namespace API.DTO
{
    public class OrderDetailDTO
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int VehicleId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<VehicleDTO>? Vehicles { get; set; }
        public OrderDTO? Order { get; set; }
    }
}
