namespace API.DTO
{
    public class OrderCompanyBrief
    {
        public int orderCompanyId { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
        public decimal SuggestPrice { get; set; }
        public int VehicleId { get; set; }
        public int EmployeeId { get; set; }
    }
}
