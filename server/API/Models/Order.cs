namespace API.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public Account? Account { get; set; }

    }
}
