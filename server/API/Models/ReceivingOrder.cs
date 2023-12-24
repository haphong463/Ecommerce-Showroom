using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ReceivingOrder
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PurchaseOrderId { get; set; }
        public DateTime? ReceivedDate { get; set; } = DateTime.Now;
        public List<Frame>? Frames { get; set; }
        public OrderCompany? OrderCompany { get; set; }
    }
}
