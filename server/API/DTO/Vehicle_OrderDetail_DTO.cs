using API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTO
{
    public class Vehicle_OrderDetail_DTO
    {
        public int OrderId { get; set; }
        public int VehicleId { get; set; }
        public int Quantity { get; set; }
    }
}
