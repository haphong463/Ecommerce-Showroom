namespace API.DTO
{
    public class ServiceBriefDTO
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public List<ServiceBrief_OrderService_DTO>? OrderServices { get; set; }
    }
}
