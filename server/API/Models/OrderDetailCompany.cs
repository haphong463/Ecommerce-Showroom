using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderDetailCompany
    {
        public int OrderDetailCompanyId { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string ModelId { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public OrderCompany? OrderCompany { get; set; }
    }
}
