namespace API.DTO
{
    public class include_OrderDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
