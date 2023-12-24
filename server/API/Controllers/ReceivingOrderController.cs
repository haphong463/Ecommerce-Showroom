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
    public class ReceivingOrderController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public ReceivingOrderController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReceivingOrder>>>> GetAlls()
        {
            try
            {
                var list = await _dbContext.ReceivingOrders
                    .Include(o => o.Frames).Include(o => o.OrderCompany)
                    .ToListAsync();

                if (list != null && list.Any())
                {
                    var result = _mapper.Map<List<ReceivingOrderDTO>>(list);
                    return Ok(new ApiResponse<IEnumerable<ReceivingOrderDTO>>(result, "Get all successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<ReceivingOrder>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivingOrder>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<ReceivingOrder>>> GetById(int id)
        {
            try
            {
                var list = await _dbContext.ReceivingOrders
                    .Include(o => o.Frames).Include(o => o.OrderCompany)
                    .SingleOrDefaultAsync(o => o.Id == id);

                if (list != null)
                {
                    var Result = _mapper.Map<ReceivingOrderDTO>(list);
                    return Ok(new ApiResponse<ReceivingOrderDTO>(Result, "Get by ID successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<ReceivingOrderDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivingOrderDTO>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<string>>> PostReceivingOrder([FromForm] List<string> frames, [FromForm] int vehicleId, [FromForm] int purchaseOrderId, [FromForm] decimal price)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<ReceivingOrder>.BadRequest(ModelState);
            }

            try
            {
                //var ReceivingId = ReceivingOd.Id;
                //var FrameNumber = ReceivingOd.FrameNumber;
                //var PurchaseOrderId = ReceivingOd.PurchaseOrderId;
                //var Frame = ReceivingOd.Frame;  //list<Frame>
                decimal RATE = 1.1m;
                var purchaseOrder = await _dbContext.OrderCompanies
                                    .Include(o => o.Vehicle).Include(o => o.Employee)
                                    .SingleOrDefaultAsync(o => o.orderCompanyId == purchaseOrderId);
                var vehicles = await _dbContext.Vehicles.FindAsync(vehicleId);
                vehicles.PurchasePrice = price;
                vehicles.Price = price * RATE;
                ;
                purchaseOrder!.OrderStatus = 1;
                var newReceive = new ReceivingOrder
                {
                    PurchaseOrderId = purchaseOrderId
                };

                await _dbContext.ReceivingOrders.AddAsync(newReceive);
                await _dbContext.SaveChangesAsync();
                var result = await _dbContext.ReceivingOrders.FindAsync(newReceive.Id);


                if (frames.Any())
                {
                    foreach (var item in frames)
                    {
                        var newFrames = new Frame
                        {
                            FrameNumber = item,
                            ReceivingOrderId = result.Id,
                            VehicleId = vehicleId
                        };
                        await _dbContext.Frames.AddAsync(newFrames);
                    }
                    await _dbContext.SaveChangesAsync();
                }




                var odCompanyDTO = _mapper.Map<OrderCompanyDTO>(purchaseOrder);

                return Ok(new ApiResponse<OrderCompanyDTO>(odCompanyDTO, "OrderCompany created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivingOrder>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<ReceivingOrder>>> Update(int id, [FromForm] include_ReceivingOdDTO RObrief)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<ReceivingOrder>.BadRequest(ModelState);
                }

                var roExisting = await _dbContext.ReceivingOrders
                    .SingleOrDefaultAsync(x => x.Id == id);
                if (roExisting != null)
                {
                    var roUpdate = _mapper.Map<ReceivingOrder>(RObrief);

                    _dbContext.Entry(roExisting).CurrentValues.SetValues(roUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<ReceivingOrder>(roUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<ReceivingOrder>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivingOrder>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var list = await _dbContext.ReceivingOrders.FindAsync(id);
                if (list != null)
                {
                    _dbContext.ReceivingOrders.Remove(list);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<ReceivingOrder>(list, "Delete successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<ReceivingOrder>(null, "Not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivingOrder>.Exception(ex);

            }
        }
    }
}
