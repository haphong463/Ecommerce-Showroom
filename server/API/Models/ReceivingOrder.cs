using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ReceivingOrder
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PurchaseOrderId { get; set; }
        public List<Frame>? Frame { get; set; }
        public OrderCompany? OrderCompany { get; set; }
    }
}
