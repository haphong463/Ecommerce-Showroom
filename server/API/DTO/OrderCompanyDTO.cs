using API.Models;

namespace API.DTO
{
    public class OrderCompanyDTO
    {
        public int orderCompanyId { get; set; }
        public string Name { get; set; }
        public string ModelId { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
        public decimal SuggestPrice { get; set; }
        public byte OrderStatus { get; set; }
        public int VehicleId { get; set; }
        public int EmployeeId { get; set; }
        public include_VehicleDTO? Vehicle { get; set; }
        public EmployeeDTO? Employee { get; set; }
    }
}
