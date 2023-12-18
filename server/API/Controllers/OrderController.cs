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
    public class OrderController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public OrderController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<OrderBriefDTO>>>> GetOrders()
        {
            var orders = await _dbContext.Orders
                .Include(x => x.Account).Include(x => x.Employee)
                .Include(o => o.OrderServices).ThenInclude(os => os.Services)
                .Include(o => o.OrderDetails).ThenInclude(os => os.Vehicles)
                .ToListAsync();
            var orderResult = orders.Select(o => new OrderBriefDTO
            {
                OrderId = o.OrderId,
                Employee = new EmployeeDTO
                {
                    EmployeeId = o.EmployeeId,
                    AccountId = o.Employee.AccountId,
                    Name = o.Employee.Name
                },
                Account = new AccountDTO
                {
                    AccountId = o.AccountId,
                    Name = o.Account.Name
                },
                OrderStatus = o.OrderStatus,
                OrderDate = o.OrderDate,
                TotalPrice = o.TotalPrice,
                OrderDetails = o.OrderDetails.Select(odD => new OrderDetailDTO
                {
                    VehicleId = odD.VehicleId,
                    Quantity = odD.Quantity,
                    Price = odD.Price,
                    Vehicles = new include_VehicleDTO
                    {
                        Name = odD.Vehicles.Name,
                        Price = odD.Vehicles.Price,
                        Quantity = odD.Vehicles.Quantity,
                        BrandId = odD.Vehicles.BrandId,
                        ModelId = odD.Vehicles.ModelId
                    }
                }).ToList(),
                OrderService = o.OrderServices.Select(odD => new OrderServiceDTO
                {
                    ServiceId = odD.ServiceId,
                    Services = new include_ServiceDTO
                    {
                        Name = odD.Services.Name,
                        Price = odD.Services.Price,
                        Description = odD.Services.Description
                    }
                }).ToList()
            });
            /*var orderResult = _mapper.Map<List<OrderBriefDTO>>(orders);*/

            return Ok(new ApiResponse<IEnumerable<OrderBriefDTO>>(orderResult, "Get all Orders successfully"));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<OrderBriefDTO>>> GetOdById(int id)
        {
            try
            {
                var od = await _dbContext.Orders
                    .Include(x => x.Account).Include(x => x.Employee).Include(o => o.OrderDetails)
                    .Include(o => o.OrderServices).ThenInclude(os => os.Services)
                    .Include(o => o.OrderDetails).ThenInclude(os => os.Vehicles)
                    .SingleOrDefaultAsync(x => x.OrderId == id);

                if (od == null)
                {
                    return NotFound(new ApiResponse<OrderBriefDTO>(null, "Not found!"));
                }

                var orderResult = new OrderBriefDTO
                {
                    OrderId = od.OrderId,
                    Employee = new EmployeeDTO
                    {
                        EmployeeId = od.EmployeeId,
                        AccountId = od.Employee.AccountId
                    },
                    Account = new AccountDTO
                    {
                        AccountId = od.AccountId,
                        Name = od.Account.Name
                    },
                    OrderStatus = od.OrderStatus,
                    OrderDate = od.OrderDate,
                    TotalPrice = od.TotalPrice,
                    OrderDetails = od.OrderDetails.Select(odD => new OrderDetailDTO
                    {
                        VehicleId = odD.VehicleId,
                        Quantity = odD.Quantity,
                        Price = odD.Price,
                        Vehicles = new include_VehicleDTO
                        {
                            Name = odD.Vehicles.Name,
                            Price = odD.Vehicles.Price,
                            Quantity = odD.Vehicles.Quantity,
                            BrandId = odD.Vehicles.BrandId,
                            ModelId = odD.Vehicles.ModelId
                        }
                    }).ToList(),
                    OrderService = od.OrderServices.Select(odD => new OrderServiceDTO
                    {
                        ServiceId = odD.ServiceId,
                        Services = new include_ServiceDTO
                        {
                            Name = odD.Services.Name,
                            Price = odD.Services.Price,
                            Description = odD.Services.Description
                        }
                    }).ToList()
                };

                /*var orderResult = _mapper.Map<OrderDTO>(od);*/

                return Ok(new ApiResponse<OrderBriefDTO>(orderResult, "Get Order successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderBriefDTO>.Exception(ex);

            }

        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Order>>> PostOders([FromQuery] int serviceId, [FromQuery] int vehicleId, [FromForm] OrderDTO orderDTO)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Order>.BadRequest(ModelState);
            }
            try
            {
                var service = await _dbContext.Services.SingleOrDefaultAsync(x => x.ServiceId == serviceId);
                var vehicle = await _dbContext.Vehicles.SingleOrDefaultAsync(x => x.VehicleId == vehicleId);

                var order = _mapper.Map<Order>(orderDTO);

                var odService = new OrderService()
                {
                    Orders = order,
                    Services = service
                };
                await _dbContext.OrderServices.AddAsync(odService);

                var odVehicle = new OrderDetails()
                {
                    Orders = order,
                    Vehicles = vehicle
                };
                await _dbContext.OrderDetails.AddAsync(odVehicle);

                await _dbContext.Orders.AddAsync(order);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetOdById), new { id = order.OrderId },
                                       new ApiResponse<Order>(order, "Order created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<Order>.Exception(ex);
            }
        }
        /*[HttpPost]
        public async Task<ActionResult<ApiResponse<Order>>> PostOrders([FromForm] Order order)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Order>.BadRequest(ModelState);
            }

            try
            {
                // Trích xuất thông tin từ đối tượng JSON
                var employeeId = order.EmployeeId;
                var accountId = order.AccountId;
                var orderServices = order.OrderServices; // List<OrderService>
                var orderDetails = order.OrderDetails; // List<OrderDetails>

                var totalPrice = order.TotalPrice;

                // Tạo đối tượng Order
                var newOrder = new Order
                {
                    EmployeeId = employeeId,
                    AccountId = accountId,
                    TotalPrice = totalPrice
                };

                // Thêm Order vào cơ sở dữ liệu

                await _dbContext.Orders.AddAsync(newOrder);
                await _dbContext.SaveChangesAsync();

                // Thêm OrderDetails vào cơ sở dữ liệu nếu có
                if (orderDetails.Any())
                {
                    foreach (var item in orderDetails)
                    {
                        var newOrderDetails = new OrderDetails
                        {
                            OrderId = newOrder.OrderId, // Sử dụng ID của Order vừa thêm vào
                            VehicleId = item.VehicleId,
                            Quantity = item.Quantity,
                            Price = item.Price
                        };
                        await _dbContext.OrderDetails.AddAsync(newOrderDetails);
                    }
                    await _dbContext.SaveChangesAsync();
                }

                // Thêm OrderServices vào cơ sở dữ liệu nếu có
                if (orderServices.Any())
                {
                    foreach (var item in orderServices)
                    {
                        var newOrderService = new OrderService
                        {
                            OrderId = newOrder.OrderId, // Sử dụng ID của Order vừa thêm vào
                            ServiceId = item.ServiceId
                        };
                        await _dbContext.OrderServices.AddAsync(newOrderService);
                    }
                    await _dbContext.SaveChangesAsync();
                }

                // Trả về thông tin đơn hàng đã tạo
                var savedOrder = await _dbContext.Orders.FindAsync(newOrder.OrderId);
                return Ok(savedOrder);
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ và trả về thông báo lỗi
                return ApiResponse<Order>.Exception(ex);
            }
        }*/
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Order>>> UpdateOder(int id, [FromForm] OrderDTO orderUpdate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<Order>.BadRequest(ModelState);
                }

                var odExisting = await _dbContext.Orders
                    /*.Include(x => x.Account).Include(x => x.Employee)
                    .Include(o => o.OrderServices)*/
                    .SingleOrDefaultAsync(x => x.OrderId == id);
                if (odExisting != null)
                {
                    var order = _mapper.Map<Order>(orderUpdate);

                    _dbContext.Entry(odExisting).CurrentValues.SetValues(order);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<Order>(order, "Order updated successfully"));
                }

                return NotFound(new ApiResponse<Order>(null, "Order not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Order>.Exception(ex);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var od = await _dbContext.Orders
                .Include(x => x.Account).Include(x => x.Employee)
                .SingleOrDefaultAsync(x => x.OrderId == id);
            if (od == null)
            {
                return NotFound(new ApiResponse<Order>(null, "Not found!"));
            }

            _dbContext.Orders.Remove(od);
            await _dbContext.SaveChangesAsync();

            return Ok(new ApiResponse<Order>(od, "Delete Order successfully!"));
        }
    }
}
