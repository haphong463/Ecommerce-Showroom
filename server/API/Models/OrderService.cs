namespace API.Models
{
    public class OrderService
    {
        public int ServiceId { get; set; }
        public int OrderId { get; set; }
        public Order? Orders { get; set; }
        public Service? Services { get; set; }
    }
}
