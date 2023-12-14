using API.Data;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiveVehicleController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public ReceiveVehicleController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReceivedVehicle>>>> GetVehiclesReceive()
        {
            try
            {
                var list = await _dbContext.ReceivedVehicles.ToListAsync();

                if (list != null && list.Any())
                {
                    return Ok(new ApiResponse<IEnumerable<ReceivedVehicle>>(list, "Get all successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<ReceivedVehicle>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivedVehicle>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReceivedVehicle>>>> GetVehicleReceiveById(int id)
        {
            try
            {
                var list = await _dbContext.ReceivedVehicles.FindAsync(id);

                if (list != null)
                {
                    return Ok(new ApiResponse<ReceivedVehicle>(list, "Get Receiving the Vehicle successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<ReceivedVehicle>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivedVehicle>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ReceivedVehicle>>> PostReceivedVehicle([FromForm] ReceivedVehicle receivedVehicle)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<ReceivedVehicle>.BadRequest(ModelState);
            }

            try
            {
                await _dbContext.ReceivedVehicles.AddAsync(receivedVehicle);
                await _dbContext.SaveChangesAsync();

                return Ok(new ApiResponse<ReceivedVehicle>(receivedVehicle, "ReceivedVehicle created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivedVehicle>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<ReceivedVehicle>>> UpdateReceivedVehicle(int id, [FromForm] ReceivedVehicle itemUpdate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<ReceivedVehicle>.BadRequest(ModelState);
                }

                var itemExisting = await _dbContext.ReceivedVehicles
                    .SingleOrDefaultAsync(x => x.Id == id);
                if (itemExisting != null)
                {
                    _dbContext.Entry(itemExisting).CurrentValues.SetValues(itemUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<ReceivedVehicle>(itemUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<ReceivedVehicle>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ReceivedVehicle>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var list = await _dbContext.ReceivedVehicles.FindAsync(id);
                if (list != null)
                {
                    _dbContext.ReceivedVehicles.Remove(list);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<ReceivedVehicle>(list, "Delete successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<ReceivedVehicle>(null, "Not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<Account>.Exception(ex);

            }
        }
    }
}
