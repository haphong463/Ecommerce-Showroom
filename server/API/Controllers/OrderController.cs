//using API.Data;
//using API.DTO;
//using API.Helper;
//using API.Models;
//using AutoMapper;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OrderController : ControllerBase
//    {
//        private readonly DatabaseContext _dbContext;
//        private readonly IMapper _mapper;
//        public OrderController(DatabaseContext dbContext, IMapper mapper)
//        {
//            _dbContext = dbContext;
//            _mapper = mapper;
//        }
//        [HttpGet]
//        public async Task<ActionResult<ApiResponse<IEnumerable<OrderDTO>>>> GetOrders()
//        {
//            var orders = await _dbContext.Orders.Include(x => x.Account).Include(x => x.Employee).ToListAsync();
//            var orderDTO = _mapper.Map<List<OrderDTO>>(orders);
//            return Ok(new ApiResponse<IEnumerable<OrderDTO>>(orderDTO, "Get all Orders successfully"));
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<ApiResponse<OrderDTO>>> GetOdById(int id)
//        {
//            try
//            {
//                var od = await _dbContext.Orders.Include(x => x.Account).Include(x => x.Employee).SingleOrDefaultAsync(x => x.OrderId == id);

//                if (od == null)
//                {
//                    return NotFound(new ApiResponse<OrderDTO>(null, "Not found!"));
//                }
//                var odDTO = _mapper.Map<OrderDTO>(od);
//                return Ok(new ApiResponse<OrderDTO>(odDTO, "Get Order successfully"));
//            }
//            catch (Exception ex)
//            {
//                return ApiResponse<OrderDTO>.Exception(ex);

//            }

//        }
//        [HttpPost]
//        public async Task<ActionResult<ApiResponse<Order>>> PostOders(Order order)
//        {
//            if (!ModelState.IsValid)
//            {
//                return ApiResponse<VehicleDTO>.BadRequest(ModelState);
//            }
//            try
//            {
//                await _dbContext.Orders.AddAsync(order);
//                await _dbContext.SaveChangesAsync();
//                var odDTO = _mapper.Map<OrderDTO>(order);
//                return CreatedAtAction(nameof(GetOdById), new { id = order.OrderId },
//                                       new ApiResponse<OrderDTO>(odDTO, "Order created successfully", 201));
//            }
//            catch (Exception ex)
//            {
//                return ApiResponse<Order>.Exception(ex);
//            }
//        }
//        [HttpPut("{id}")]
//        public async Task<ActionResult<ApiResponse<OrderDTO>>> UpdateOder(int id, Order orderUpdate)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    return ApiResponse<OrderDTO>.BadRequest(ModelState);
//                }

//                var odExisting = await _dbContext.Orders.Include(x => x.Account).Include(x => x.Employee).SingleOrDefaultAsync(x => x.OrderId == id);
//                if (odExisting != null)
//                {
//                    _dbContext.Entry(odExisting).CurrentValues.SetValues(orderUpdate);
//                    await _dbContext.SaveChangesAsync();

//                    var updatedDto = _mapper.Map<OrderDTO>(orderUpdate);
//                    return Ok(new ApiResponse<OrderDTO>(updatedDto, "Order updated successfully"));
//                }

//                return NotFound(new ApiResponse<OrderDTO>(null, "Order not found"));
//            }
//            catch (Exception ex)
//            {
//                return ApiResponse<OrderDTO>.Exception(ex);
//            }
//        }
//        [HttpDelete("{id}")]
//        public async Task<ActionResult<ApiResponse<OrderDTO>>> DeleteOrder(int id)
//        {
//            var od = await _dbContext.Orders.Include(x => x.Account).Include(x => x.Employee).SingleOrDefaultAsync(x => x.OrderId == id);
//            if (od == null)
//            {
//                return NotFound(new ApiResponse<OrderDTO>(null, "Not found!"));
//            }

//            _dbContext.Orders.Remove(od);
//            await _dbContext.SaveChangesAsync();

//            var odDTO = _mapper.Map<OrderDTO>(od);
//            return Ok(new ApiResponse<OrderDTO>(odDTO, "Delete Order successfully!"));
//        }
//    }
//}
