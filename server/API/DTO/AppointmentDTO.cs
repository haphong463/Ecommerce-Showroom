using API.Models;

namespace API.DTO
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int AccountId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public AccountDTO? Accounts { get; set; }
        public include_VehicleDTO? Vehicles { get; set; }
    }
}
