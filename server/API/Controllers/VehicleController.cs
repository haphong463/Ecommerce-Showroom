using API.Data;
using API.DTO;
using API.Helper;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        public readonly DatabaseContext _dbContext;
        public readonly IMapper _mapper;
        public VehicleController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<VehicleDTO>>>> GetVehicles()
        {
            var vehicles = await _dbContext.Vehicles.ToListAsync();
            var vehicleDtos = _mapper.Map<List<VehicleDTO>>(vehicles);
            return Ok(new ApiResponse<IEnumerable<VehicleDTO>>(vehicleDtos, "Get all vehicles successfully"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> GetVehicleById(int id)
        {
            var vehicle = await _dbContext.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound(new ApiResponse<VehicleDTO>(null, "Vehicle not found"));
            }

            var vehicleDto = _mapper.Map<VehicleDTO>(vehicle);
            return Ok(new ApiResponse<VehicleDTO>(vehicleDto, "Get vehicle successfully"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> PostVehicle([FromBody] VehicleDTO vehicleDto)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<VehicleDTO>.BadRequest(ModelState);
            }

            try
            {
                var vehicle = _mapper.Map<Vehicle>(vehicleDto);
                await _dbContext.Vehicles.AddAsync(vehicle);
                await _dbContext.SaveChangesAsync();

                var createdDto = _mapper.Map<VehicleDTO>(vehicle);
                return CreatedAtAction(nameof(GetVehicleById), new { id = createdDto.VehicleID }, new ApiResponse<VehicleDTO>(createdDto, "Vehicle created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse< VehicleDTO>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> UpdateVehicle(int id, [FromBody] VehicleDTO vehicleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<VehicleDTO>.BadRequest(ModelState);
                }

                var vehicle = await _dbContext.Vehicles.FindAsync(id);
                if (vehicle != null)
                {
                    _mapper.Map(vehicleDto, vehicle);

                    _dbContext.Update(vehicle);
                    await _dbContext.SaveChangesAsync();

                    var updatedDto = _mapper.Map<VehicleDTO>(vehicle);
                    return Ok(new ApiResponse<VehicleDTO>(updatedDto, "Vehicle updated successfully"));
                }

                return NotFound(new ApiResponse<VehicleDTO>(null, "Vehicle not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<VehicleDTO>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _dbContext.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound(new ApiResponse<VehicleDTO>(null, "Vehicle not found", 404));
            }

            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();

            var vehicleDto = _mapper.Map<VehicleDTO>(vehicle);
            return Ok(new ApiResponse<VehicleDTO>(vehicleDto, "Delete vehicle successfully"));
        }
    }
}
