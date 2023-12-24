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
        public bool IsUsed { get; set; }
        public int NumberOfSeats { get; set; }
        public string FuelType { get; set; }
        public string TransmissionType { get; set; }
        public string Color { get; set; }
        public List<ImageDTO> Images { get; set; }

    }
}
