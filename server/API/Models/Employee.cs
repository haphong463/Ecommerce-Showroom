namespace API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public int AccountId { get; set; }
        public Account? Account { get; set; }
        public List<Order>? Order { get; set; }
    }
}
