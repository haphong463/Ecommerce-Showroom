using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class BrandDTO
    {
        public int BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? ImagePath { get; set; }
        public List<VehicleDTO>? Vehicles { get; set; }
    }
}
