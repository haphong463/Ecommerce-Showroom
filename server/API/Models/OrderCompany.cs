using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderCompany
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orderCompanyId { get; set; }
        public int Status { get; set; }
        public DateTime OrderDate { get; set; }
        public string NameCompany { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public List<OrderDetailCompany>? orderDetailCompanies { get; set; }
    }
}
