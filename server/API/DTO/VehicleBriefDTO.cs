namespace API.DTO
{
    public class VehicleBriefDTO
    {
        public int VehicleId { get; set; }
        public string VIN { get; set; }
        public VehicleStatus Status { get; set; }
    }
}
