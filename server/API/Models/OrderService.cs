using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderService
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderServiceId { get; set; }
        public int OrderId { get; set; }
        public int ServiceId { get; set; }
        public Order? Orders { get; set; }
        public Service? Services { get; set; }
    }
}
