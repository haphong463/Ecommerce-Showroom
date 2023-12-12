using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using API.DTO;
using AutoMapper;
using API.Helper;
using Microsoft.EntityFrameworkCore;



namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public EmployeeController(DatabaseContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> GetAllEmployees()
        {
            var employeesWithAccounts = _dbContext.Employees
                .Join(
                    _dbContext.Accounts,
                    employee => employee.AccountId,
                    account => account.AccountId,
                    (employee, account) => new
                    {
                        EmployeeId = employee.EmployeeId,
                        AccountId = employee.AccountId,
                        Account = new
                        {
                            // Lấy thông tin tài khoản
                            // Ví dụ: Name, Email, Phone, ...
                            account.Name,
                            account.Email,
                            account.Password,
                            account.Phone,
                            account.Role,
                            account.AvatarUrl,
                            account.Gender,
                            account.DateOfBirth,
                            account.CreatedAt,
                            account.UpdatedAt

                        }
                    }
                )
                .ToList();

            return Ok(employeesWithAccounts);
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeeById(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.AccountId == id);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }
            return Ok(employee);
        }
    }
}
