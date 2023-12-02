namespace API.DTO
{
    
        public class EmployeeDTO
        {
            public int EmployeeId { get; set; }
            public int AccountId { get; set; }
            public string Name { get; set; }
            public string Email { get; set; } 
            public string Phone { get; set; }
            public string Role { get; set; }
            public string AvatarUrl { get; set; } 
            public string Gender { get; set; } 
            public DateTime DateOfBirth { get; set; } 
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; } 
        }

    }

