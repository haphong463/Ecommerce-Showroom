namespace API.DTO
{
    public class OrderBriefDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public int TotalPrice { get; set; }
        public AccountDTO Account { get; set; }
        public EmployeeDTO Employee { get; set; }
        public List<include_ServiceDTO>? Services { get; set; }
        public List<include_VehicleDTO>? Vehicles { get; set; }
    }
}
