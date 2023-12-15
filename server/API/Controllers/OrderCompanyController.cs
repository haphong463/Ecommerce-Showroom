using API.Data;
using API.Helper;
using API.Models;
using AutoMapper;
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
        public async Task<ActionResult<ApiResponse<IEnumerable<OrderCompany>>>> GetOrders()
        {
            try
            {
                var list = await _dbContext.OrderCompanies.ToListAsync();

                if (list != null && list.Any())
                {
                    return Ok(new ApiResponse<IEnumerable<OrderCompany>>(list, "Get all successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<OrderCompany>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<IEnumerable<OrderCompany>>>> GetOrderById(int id)
        {
            try
            {
                var list = await _dbContext.OrderCompanies.FindAsync(id);

                if (list != null)
                {
                    return Ok(new ApiResponse<OrderCompany>(list, "Get Receiving the Vehicle successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<OrderCompany>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<OrderCompany>>> PostOrder([FromForm] OrderCompany odCompany)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<OrderCompany>.BadRequest(ModelState);
            }

            try
            {
                await _dbContext.OrderCompanies.AddAsync(odCompany);
                await _dbContext.SaveChangesAsync();

                return Ok(new ApiResponse<OrderCompany>(odCompany, "ReceivedVehicle created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<OrderCompany>>> UpdateOrder(int id, [FromForm] OrderCompany odUpdate)
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
