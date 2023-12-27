using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using AutoMapper;
using MailKit.Search;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderCompanyController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public OrderCompanyController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<OrderCompanyDTO>>>> GetOrders()
        {
            try
            {
                var list = await _dbContext.OrderCompanies
                    .Include(o => o.Vehicle).Include(o => o.Employee)
                    .ToListAsync();

                if (list != null && list.Any())
                {
                    var Result = list.Select(o => new OrderCompanyDTO
                    {
                        orderCompanyId = o.orderCompanyId,
                        Brand = o.Brand,
                        ModelId = o.ModelId,
                        Name = o.Name,
                        Quantity = o.Quantity,
                        SuggestPrice = o.SuggestPrice,

                        OrderStatus = o.OrderStatus,
                        EmployeeId = o.EmployeeId,
                        Employee = new EmployeeDTO
                        {
                            EmployeeId = o.EmployeeId,
                            AccountId = o.Employee.AccountId,
                            Name = o.Employee.Name,
                        },
                        OrderDate = o.OrderDate,
                        VehicleId = o.VehicleId,
                        Vehicle = new include_VehicleDTO
                        {
                            VehicleId = o.Vehicle.VehicleId,
                            Name = o.Vehicle.Name,
                            ModelId = o.Vehicle.ModelId,
                            TransmissionType = o.Vehicle.TransmissionType,
                            NumberOfSeats = o.Vehicle.NumberOfSeats,
                            FuelType = o.Vehicle.FuelType,
                            IsUsed = o.Vehicle.IsUsed,
                            Color = o.Vehicle.Color,

                        },

                    });
                    return Ok(new ApiResponse<IEnumerable<OrderCompanyDTO>>(Result, "Get all Orders successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<OrderCompanyDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompanyDTO>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<OrderCompanyDTO>>> GetOrderById(int id)
        {
            try
            {
                var o = await _dbContext.OrderCompanies
                    .Include(o => o.Vehicle).Include(o => o.Employee)
                    .SingleOrDefaultAsync(o => o.orderCompanyId == id);

                if (o != null)
                {
                    var Result = new OrderCompanyDTO
                    {
                        orderCompanyId = o.orderCompanyId,

                        Quantity = o.Quantity,
                        SuggestPrice = o.SuggestPrice,
                        EmployeeId = o.EmployeeId,
                        Employee = new EmployeeDTO
                        {
                            EmployeeId = o.EmployeeId,
                            AccountId = o.Employee.AccountId
                        },
                        OrderDate = o.OrderDate,
                        VehicleId = o.VehicleId,
                        Vehicle = new include_VehicleDTO
                        {
                            VehicleId = o.Vehicle.VehicleId,
                            Name = o.Vehicle.Name
                        }
                    };
                    return Ok(new ApiResponse<OrderCompanyDTO>(Result, "Get Order successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<OrderCompanyDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompanyDTO>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<OrderCompany>>> PostOrder([FromForm] OrderCompanyBrief OCbrief)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<OrderCompany>.BadRequest(ModelState);
            }

            try
            {
                var odCompany = _mapper.Map<OrderCompany>(OCbrief);

                await _dbContext.OrderCompanies.AddAsync(odCompany);
                await _dbContext.SaveChangesAsync();

                var result = await _dbContext.OrderCompanies
                    .Include(o => o.Vehicle).Include(o => o.Employee)
                    .SingleOrDefaultAsync(o => o.orderCompanyId == odCompany.orderCompanyId);

                var odCompanyDTO = _mapper.Map<OrderCompanyDTO>(result);



                return Ok(new ApiResponse<OrderCompanyDTO>(odCompanyDTO, "OrderCompany created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }
        }
        [HttpPut("cancel/{id}")]
        public async Task<ActionResult<ApiResponse<OrderCompany>>> PostCancel([FromForm] int id)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<OrderCompany>.BadRequest(ModelState);
            }

            try
            {
                var result = await _dbContext.OrderCompanies
 .Include(o => o.Vehicle).Include(o => o.Employee)
 .SingleOrDefaultAsync(o => o.orderCompanyId == id);
                result.OrderStatus = 2;
                await _dbContext.SaveChangesAsync();


                var odCompanyDTO = _mapper.Map<OrderCompanyDTO>(result);
                return Ok(new ApiResponse<OrderCompanyDTO>(odCompanyDTO, "OrderCompany created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }
        }
        /*[HttpPost]
        public async Task<ActionResult<ApiResponse<OrderCompanyDTO>>> PostOrder([FromForm] OrderCompany odCompany)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<OrderCompany>.BadRequest(ModelState);
            }

            try
            {

                await _dbContext.OrderCompanies.AddAsync(odCompany);
                await _dbContext.SaveChangesAsync();

                var result = await _dbContext.OrderCompanies
                    .Include(o => o.Vehicle).Include(o => o.Employee)
                    .SingleOrDefaultAsync(o => o.orderCompanyId == odCompany.orderCompanyId);

                var odCompanyDTO = _mapper.Map<OrderCompanyDTO>(result);

                return Ok(new ApiResponse<OrderCompanyDTO>(odCompanyDTO, "OrderCompany created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompanyDTO>.Exception(ex);
            }
        }*/

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<OrderCompany>>> UpdateOrder(int id, [FromForm] OrderCompanyBrief OCbrief)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<OrderCompany>.BadRequest(ModelState);
                }

                var odExisting = await _dbContext.OrderCompanies
                    .SingleOrDefaultAsync(x => x.orderCompanyId == id);
                if (odExisting != null)
                {
                    var odUpdate = _mapper.Map<OrderCompany>(OCbrief);

                    _dbContext.Entry(odExisting).CurrentValues.SetValues(odUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<OrderCompany>(odUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<OrderCompany>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var list = await _dbContext.OrderCompanies.FindAsync(id);
                if (list != null)
                {
                    _dbContext.OrderCompanies.Remove(list);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<OrderCompany>(list, "Delete successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<OrderCompany>(null, "Not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);

            }
        }
    }
}
