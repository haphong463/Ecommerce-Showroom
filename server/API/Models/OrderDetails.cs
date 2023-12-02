namespace API.Models
{
    public class OrderDetails
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int VehicleId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<Vehicle>? Vehicles { get; set; }
        public Order? Order { get; set; }
    }
}
