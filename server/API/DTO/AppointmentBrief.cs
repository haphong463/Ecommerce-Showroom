namespace API.DTO
{
    public class AppointmentBrief
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int AccountId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
