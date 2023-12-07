<<<<<<< HEAD
﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderStatus { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public Account? Account { get; set; }
        public Employee? Employee { get; set; }

    }
}
=======
﻿//namespace API.Models
//{
//    public class Order
//    {
//        public int OrderId { get; set; }
//        public int AccountId { get; set; }
//        public int EmployeeId { get; set; }
//        public int OrderStatus { get; set; }
//        public DateTime OrderDate { get; set; } = DateTime.Now;
//        public Account? Account { get; set; }
//        public Employee? Employee { get; set; }
//    }
//}
>>>>>>> 149b835c779942b0e27c419baa0bedbc5c2c939e
