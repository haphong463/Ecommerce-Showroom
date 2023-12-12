using API.Models;

namespace API.DTO
{
    public class OrderServiceDTO
    {
        public int ServiceId { get; set; }
        public int OrderId { get; set; }
        public include_ServiceDTO? Services { get; set; }
    }
}
