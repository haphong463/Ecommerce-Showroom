using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderDetails
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDetailsId { get; set; }
        public int OrderId { get; set; }
        public int VehicleId { get; set; }
        public Vehicle? Vehicles { get; set; }
        public Order? Orders { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
    }
}
