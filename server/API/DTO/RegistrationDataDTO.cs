namespace API.DTO
{
    public class RegistrationDataDTO
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int AccountId { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string RegistrationAuthority { get; set; }
    }
}
