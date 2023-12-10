using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public int TotalPrice { get; set; }
        public Account? Account { get; set; }
        public Employee? Employee { get; set; }
        public List<OrderDetails>? OrderDetails { get; set; }
        public List<OrderService>? OrderServices { get; set; }
    }
}

