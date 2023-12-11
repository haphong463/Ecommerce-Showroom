namespace API.DTO
{
    public class VehicleBriefDTO
    {
        public int VehicleId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public string? ModelId { get; set; }
        public int ManufacturingYear { get; set; }
        public string RegistrationNumber { get; set; }
        public string Color { get; set; }

        public float Mileage { get; set; }
        public string EngineType { get; set; }
        public string TransmissionType { get; set; }
        public string FuelType { get; set; }

        public int NumberOfSeats { get; set; }

        public DateTime? PurchaseDate { get; set; }
        public decimal PurchasePrice { get; set; }
        public VehicleStatus Status { get; set; }
        public bool IsUsed { get; set; }
        public List<ImageDTO> Images { get; set; }
        public Vehicle_BrandDTO Brand { get; set; }
        public List<include_OrderDTO>? Orders { get; set; }
    }
}
