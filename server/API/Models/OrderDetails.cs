<<<<<<< HEAD
﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderDetails
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int VehicleId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<Vehicle>? Vehicles { get; set; }
        public Order? Order { get; set; }
    }
}
=======
﻿//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace API.Models
//{
//    public class OrderDetails
//    {
//        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public int OrderDetailId { get; set; }
//        public int OrderId { get; set; }
//        public int VehicleId { get; set; }
//        public int Quantity { get; set; }
//        public decimal Price { get; set; }
//        public List<Vehicle>? Vehicles { get; set; }
//        public Order? Order { get; set; }
//    }
//}
>>>>>>> 149b835c779942b0e27c419baa0bedbc5c2c939e
