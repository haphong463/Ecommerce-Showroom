namespace API.DTO
{
    
        public class EmployeeDTO
        {
            public int EmployeeId { get; set; }
            public int AccountId { get; set; }
            public string Name { get; set; }
            public List<OrderDTO> Order { get; set; }

    }

}

