using API.Data;
using API.DTO;
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
    public class ServiceController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public ServiceController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ServiceBriefDTO>>>> GetServices()
        {
            var services = await _dbContext.Services
                .Include(s => s.OrderServices)
                .ThenInclude(os => os.Orders)
                .ToListAsync();

            /*var serviceDTO = _mapper.Map<List<ServiceDTO>>(services);*/
            var serviceDTO = services.Select(s => new ServiceBriefDTO
            {
                ServiceId = s.ServiceId,
                Name = s.Name,
                Description = s.Description,
                Price = s.Price,
                Orders = s.OrderServices.Select(o => new include_OrderDTO
                {
                    OrderId = o.OrderId,
                    AccountId = o.Orders.AccountId,
                    EmployeeId = o.Orders.EmployeeId,
                    TotalPrice = o.Orders.TotalPrice
                }).ToList()
            });
            return Ok(new ApiResponse<IEnumerable<ServiceBriefDTO>>(serviceDTO, "Get all Services successfully"));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ServiceBriefDTO>>> GetServiceById(int id)
        {
            try
            {
                var service = await _dbContext.Services
                    .Include(s => s.OrderServices)
                        .ThenInclude(os => os.Orders)
                    .SingleOrDefaultAsync(x => x.ServiceId == id);
                if (service == null)
                {
                    return NotFound(new ApiResponse<ServiceBriefDTO>(null, "Not found!"));
                }

                /*var serviceDTO = _mapper.Map<ServiceDTO>(service);*/
                var serviceDTO = new ServiceBriefDTO
                {
                    ServiceId = service.ServiceId,
                    Name = service.Name,
                    Description = service.Description,
                    Price = service.Price,
                    Orders = service.OrderServices.Select(o => new include_OrderDTO
                    {
                        OrderId = o.OrderId,
                        AccountId = o.Orders.AccountId,
                        EmployeeId = o.Orders.EmployeeId,
                        TotalPrice = o.Orders.TotalPrice
                    }).ToList()
                };

                return Ok(new ApiResponse<ServiceBriefDTO>(serviceDTO, "Get Service successfully"));

            }
            catch (Exception ex)
            {
                return ApiResponse<ServiceBriefDTO>.Exception(ex);

            }
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Service>>> PostService([FromForm] ServiceDTO serviceDTO)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Service>.BadRequest(ModelState);
            }

            try
            {
                var service = _mapper.Map<Service>(serviceDTO);

                await _dbContext.Services.AddAsync(service);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetServiceById), new { id = service.ServiceId },
                    new ApiResponse<Service>(service, "Service created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<Service>.Exception(ex);
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Service>>> UpdateService(int id, [FromForm] ServiceDTO serviceUpdate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<Service>.BadRequest(ModelState);
                }

                var serviceExisting = await _dbContext.Services
                    .SingleOrDefaultAsync(x => x.ServiceId == id);
                if (serviceExisting != null)
                {
                    _dbContext.Entry(serviceExisting).CurrentValues.SetValues(serviceUpdate);
                    await _dbContext.SaveChangesAsync();

                    var service = _mapper.Map<Service>(serviceExisting);
                    return Ok(new ApiResponse<Service>(service, "Service updated successfully"));
                }

                return NotFound(new ApiResponse<Service>(null, "Service not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Service>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _dbContext.Services
                .SingleOrDefaultAsync(x => x.ServiceId == id);

            if (service == null)
            {
                return NotFound(new ApiResponse<Service>(null, "Not found!", 404));
            }

            _dbContext.Services.Remove(service);
            await _dbContext.SaveChangesAsync();

            return Ok(new ApiResponse<Service>(service, "Delete Brand successfully!"));
        }
    }
}
