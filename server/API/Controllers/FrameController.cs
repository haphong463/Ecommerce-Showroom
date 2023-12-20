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
    public class FrameController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public FrameController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<FrameDTO>>>> GetOrders()
        {
            try
            {
                var list = await _dbContext.Frames
                    .Include(f => f.Vehicle).Include(f => f.ReceivingOrder)
                    .ToListAsync();

                if (list != null && list.Any())
                {
                    var Result = list.Select(o => new FrameDTO
                    {
                        Id = o.Id,
                        FrameNumber = o.FrameNumber,
                        VehicleId = o.VehicleId,
                        Vehicle = new include_VehicleDTO
                        {
                            VehicleId = o.Vehicle.VehicleId,
                            Name = o.Vehicle.Name
                        },
                        ReceivingOrderId = o.ReceivingOrderId,
                        Receiving_order = new include_ReceivingOdDTO
                        {
                            Id = o.ReceivingOrder.Id,
                            PurchaseOrderId = o.ReceivingOrder.PurchaseOrderId
                        }
                    });
                    return Ok(new ApiResponse<IEnumerable<FrameDTO>>(Result, "Get all Frames successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<FrameDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Frame>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<FrameDTO>>> GetFrameById(int id)
        {
            try
            {
                var list = await _dbContext.Frames
                    .Include(o => o.Vehicle).Include(o => o.ReceivingOrder)
                    .SingleOrDefaultAsync(o => o.Id == id);

                if (list != null)
                {
                    var Result = new FrameDTO
                    {
                        Id = list.Id,
                        FrameNumber = list.FrameNumber,
                        VehicleId = list.VehicleId,
                        Vehicle = new include_VehicleDTO
                        {
                            VehicleId = list.Vehicle.VehicleId,
                            Name = list.Vehicle.Name
                        },
                        ReceivingOrderId = list.ReceivingOrderId,
                        Receiving_order = new include_ReceivingOdDTO
                        {
                            Id = list.ReceivingOrder.Id,
                            PurchaseOrderId = list.ReceivingOrder.PurchaseOrderId
                        }
                    };
                    return Ok(new ApiResponse<FrameDTO>(Result, "Get Frame successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<FrameDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<FrameDTO>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Frame>>> PostFrame([FromForm] FrameBrief frameBrief)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Frame>.BadRequest(ModelState);
            }

            try
            {
                var frame = _mapper.Map<Frame>(frameBrief);

                await _dbContext.Frames.AddAsync(frame);
                await _dbContext.SaveChangesAsync();

                return Ok(new ApiResponse<Frame>(frame, "Frame created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Frame>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Frame>>> UpdateFrame(int id, [FromForm] FrameBrief frameBrief)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<Frame>.BadRequest(ModelState);
                }

                var frameExisting = await _dbContext.Frames
                    .SingleOrDefaultAsync(x => x.Id == id);
                if (frameExisting != null)
                {
                    var frameUpdate = _mapper.Map<Frame>(frameBrief);

                    _dbContext.Entry(frameExisting).CurrentValues.SetValues(frameUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<Frame>(frameUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<Frame>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Frame>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var list = await _dbContext.Frames.FindAsync(id);
                if (list != null)
                {
                    _dbContext.Frames.Remove(list);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Frame>(list, "Delete successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<Frame>(null, "Not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Frame>.Exception(ex);

            }
        }
    }
}
