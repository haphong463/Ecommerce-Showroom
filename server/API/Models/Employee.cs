using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Employee
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public int AccountId { get; set; }
        public Account? Account { get; set; }
        public List<Order>? Order { get; set; }
    }
}
