namespace API.DTO
{
    public class OrderBriefDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public AccountDTO Account { get; set; }
        public EmployeeDTO Employee { get; set; }
        public List<OrderServiceDTO>? OrderService { get; set; }
        public List<OrderDetailDTO>? OrderDetails { get; set; }
    }
}
