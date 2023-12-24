using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderCompany
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orderCompanyId { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string ModelId { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal SuggestPrice { get; set; }
        public byte? OrderStatus { get; set; } = 0;
        public DateTime? OrderDate { get; set; } = DateTime.Now;
        public int VehicleId { get; set; }
        public int EmployeeId { get; set; }
        public Vehicle? Vehicle { get; set; }
        public Employee? Employee { get; set; }
    }
}
