﻿using API.Data;
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
                    .Include(o => o.Frame).Include(o => o.OrderCompany)
                    .ToListAsync();

                if (list != null && list.Any())
                {
                    var Result = _mapper.Map<List<ReceivingOrderDTO>>(list);
                    return Ok(new ApiResponse<IEnumerable<ReceivingOrderDTO>>(Result, "Get all successfully"));
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
                    .Include(o => o.Frame).Include(o => o.OrderCompany)
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
        public async Task<ActionResult<ApiResponse<ReceivingOrder>>> PostReceivingOrder([FromForm] ReceivingOrder ReceivingOd)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<ReceivingOrder>.BadRequest(ModelState);
            }

            try
            {
                var ReceivingId = ReceivingOd.Id;
                var FrameNumber = ReceivingOd.FrameNumber;
                var PurchaseOrderId = ReceivingOd.PurchaseOrderId;
                var Frame = ReceivingOd.Frame;  //list<Frame>

                var newReceive = new ReceivingOrder
                {
                    Id = ReceivingId,
                    FrameNumber = FrameNumber,
                    PurchaseOrderId = PurchaseOrderId
                };

                await _dbContext.ReceivingOrders.AddAsync(newReceive);
                await _dbContext.SaveChangesAsync();


                if (Frame.Any())
                {
                    foreach (var item in Frame)
                    {
                        var newFrames = new Frame
                        {
                            FrameNumber = newReceive.FrameNumber,
                            Id = item.Id,
                            ReceivingOrderId = item.ReceivingOrderId,
                            VehicleId = item.VehicleId
                        };
                        await _dbContext.Frames.AddAsync(newFrames);
                    }
                    await _dbContext.SaveChangesAsync();
                }

                var result = await _dbContext.ReceivingOrders.FindAsync(newReceive.Id);

                return Ok(new ApiResponse<ReceivingOrder>(result, "ReceivingOrder created successfully"));
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
