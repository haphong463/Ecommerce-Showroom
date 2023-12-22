namespace API.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int AccountId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public Account? Accounts { get; set; }
        public Vehicle? Vehicles { get; set; }
    }
}
