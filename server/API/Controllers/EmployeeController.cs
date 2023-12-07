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
        private readonly IMapper _mapper;


        public EmployeeController(DatabaseContext context, IMapper mapper)
        {
            _dbContext = context;
            _mapper = mapper;


        }

        [HttpGet]
        public ActionResult<ApiResponse<IEnumerable<EmployeeDTO>>> GetAllEmployees()
        {
            var employees = _dbContext.Employees.ToList();
            var employeeDtos = _mapper.Map<List<EmployeeDTO>>(employees);
            return Ok(new ApiResponse<IEnumerable<EmployeeDTO>>(employeeDtos, "Get all employees successfully"));
        }

        [HttpGet("{id}")]
        public ActionResult<ApiResponse<EmployeeDTO>> GetEmployeeById(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.EmployeeId == id);
            if (employee == null)
            {
                return NotFound(new ApiResponse<EmployeeDTO>(null, "Employee not found"));
            }

            var employeeDTO = _mapper.Map<EmployeeDTO>(employee);
            return Ok(new ApiResponse<EmployeeDTO>(employeeDTO, "Get employee successfully"));
        }

        [HttpPost]
        public ActionResult<ApiResponse<EmployeeDTO>> CreateEmployee([FromForm] EmployeeDTO employeeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<EmployeeDTO>(null, "Invalid data", 400) { Errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList() });
            }

            try
            {
                var employee = _mapper.Map<Employee>(employeeDTO);
                _dbContext.Employees.Add(employee);
                _dbContext.SaveChanges();

                var mappedDto = _mapper.Map<EmployeeDTO>(employee);

                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, new ApiResponse<EmployeeDTO>(mappedDto, "Employee created successfully", 201));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<EmployeeDTO>(null, $"An error occurred while creating the employee: {ex.Message}", 500));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.EmployeeId == id);
            if (employee == null)
            {
                return NotFound(new ApiResponse<EmployeeDTO>(null, "Employee not found", 404));
            }

            try
            {
                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();

                var employeeDto = _mapper.Map<EmployeeDTO>(employee);
                return Ok(new ApiResponse<EmployeeDTO>(employeeDto, "Employee deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<EmployeeDTO>(null, $"An error occurred while deleting the employee: {ex.Message}", 500));
            }
        }
    }
}
