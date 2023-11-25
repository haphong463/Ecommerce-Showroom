using API.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Vehicle
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int VehicleID { get; set; }

    [Required]
    [StringLength(50), Column(TypeName = "nvarchar(50)")]
    public string Model { get; set; }
    [Required]
    public int BrandId { get; set; }
    public int ManufacturingYear { get; set; }

    [StringLength(20)]
    [Column(TypeName = "nvarchar(20)")]
    public string RegistrationNumber { get; set; }

    [StringLength(30)]
    [Column(TypeName = "nvarchar(30)")]
    public string Color { get; set; }

    public float Mileage { get; set; }

    [StringLength(50)]
    [Column(TypeName = "nvarchar(50)")]
    public string EngineType { get; set; }

    [StringLength(50)]
    [Column(TypeName = "nvarchar(50)")]
    public string TransmissionType { get; set; }

    [StringLength(20)]
    [Column(TypeName = "nvarchar(20)")]
    public string FuelType { get; set; }

    public int NumberOfSeats { get; set; }

    public DateTime? PurchaseDate { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal PurchasePrice { get; set; }

    [EnumDataType(typeof(VehicleStatus))]
    public VehicleStatus Status { get; set; }
    [NotMapped]
    public List<Images>? Images { get; set; }
    [NotMapped]
    public Brand? Brand { get; set; }
}

public enum VehicleStatus
{
    Available,
    NotAvailable,
    Sold
}
