namespace API.DTO
{
    public class include_VehicleDTO
    {
        public int VehicleId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int BrandId { get; set; }
        public string? ModelId { get; set; }
    }
}
