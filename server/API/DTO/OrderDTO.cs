using API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
