using API.Models;

namespace API.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public AccountDTO? Account { get; set; }
        public EmployeeDTO? Employee { get; set; }
    }
}
