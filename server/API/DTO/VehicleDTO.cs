using API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class VehicleDTO
    {
        public int VehicleID { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }
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
        [EnumDataType(typeof(VehicleStatus))]
        public VehicleStatus Status { get; set; }
        public List<ImageDTO> Images { get; set; }
        public BrandDTO Brand { get; set; }
    }
}
