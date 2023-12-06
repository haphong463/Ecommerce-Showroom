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
    public class OrderDetailController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public OrderDetailController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<OrderDetailDTO>>>> GetOrderDetails()
        {
            var orderDetails = await _dbContext.OrderDetails.Include(x => x.Order).Include(x => x.Vehicles).ToListAsync();
            var odDetailDTO = _mapper.Map<List<OrderDetailDTO>>(orderDetails);
            return Ok(new ApiResponse<IEnumerable<OrderDetailDTO>>(odDetailDTO, "Get all orderDetails successfully"));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<OrderDetailDTO>>> GetOdDetailById(int id)
        {
            var odDetail = await _dbContext.OrderDetails.Include(x => x.Order).Include(x => x.Vehicles).SingleOrDefaultAsync(x => x.OrderDetailId == id);

            if (odDetail == null)
            {
                return NotFound(new ApiResponse<OrderDetailDTO>(null, "Not found!"));
            }
            var odDetailDTO = _mapper.Map<OrderDetailDTO>(odDetail);
            return Ok(new ApiResponse<OrderDetailDTO>(odDetailDTO, "Get odDetail successfully"));
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse<OrderDetailDTO>>> PostOderDetails(OrderDetails orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<OrderDetailDTO>.BadRequest(ModelState);
            }
            try
            {
                await _dbContext.OrderDetails.AddAsync(orderDetail);
                await _dbContext.SaveChangesAsync();

                var odDetailDTO = _mapper.Map<OrderDetailDTO>(orderDetail);
                return CreatedAtAction(nameof(GetOdDetailById), new { id = orderDetail.OrderDetailId },
                                        new ApiResponse<OrderDetailDTO>(odDetailDTO, "OderDetail created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<VehicleDTO>.Exception(ex);
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<OrderDetailDTO>>> UpdateOderDetail(int id, OrderDetails odDetailUpdate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<OrderDetailDTO>.BadRequest(ModelState);
                }

                var odDetailExisting = await _dbContext.OrderDetails.Include(x => x.Order).Include(x => x.Vehicles).SingleOrDefaultAsync(x => x.OrderDetailId == id);
                if (odDetailExisting != null)
                {
                    _dbContext.Entry(odDetailExisting).CurrentValues.SetValues(odDetailUpdate);
                    await _dbContext.SaveChangesAsync();

                    var updatedDto = _mapper.Map<OrderDetailDTO>(odDetailUpdate);
                    return Ok(new ApiResponse<OrderDetailDTO>(updatedDto, "Vehicle updated successfully"));
                }

                return NotFound(new ApiResponse<OrderDetailDTO>(null, "Vehicle not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderDetailDTO>.Exception(ex);
            }
        }
    }
}
