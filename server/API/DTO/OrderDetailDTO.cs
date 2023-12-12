using API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTO
{
    public class OrderDetailDTO
    {
        public int VehicleId { get; set; }
        public include_VehicleDTO? Vehicles { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
