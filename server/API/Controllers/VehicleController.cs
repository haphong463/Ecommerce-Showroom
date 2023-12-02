using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        public readonly DatabaseContext _dbContext;
        public readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public VehicleController(DatabaseContext dbContext, IMapper mapper, IWebHostEnvironment env)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _env = env;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Vehicle>>>> GetVehicles()
        {
            var vehicles = await _dbContext.Vehicles.Include(x => x.Brand).Include(x => x.Images).ToListAsync();
            var vehicleDtos = _mapper.Map<List<VehicleDTO>>(vehicles);
            return Ok(new ApiResponse<IEnumerable<VehicleDTO>>(vehicleDtos, "Get all vehicles successfully"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> GetVehicleById(int id)
        {
            var vehicle = await _dbContext.Vehicles.Include(x => x.Brand).Include(x => x.Images).SingleOrDefaultAsync(x => x.VehicleId == id);

            if (vehicle == null)
            {
                return NotFound(new ApiResponse<VehicleDTO>(null, "Vehicle not found"));
            }

            var vehicleDto = _mapper.Map<VehicleDTO>(vehicle);
            return Ok(new ApiResponse<VehicleDTO>(vehicleDto, "Get vehicle successfully"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> PostVehicle([FromForm] Vehicle vehicle, List<IFormFile> files)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<VehicleDTO>.BadRequest(ModelState);
            }
            try
            {
                // Lưu ảnh và lấy đường dẫn
                if (files != null && files.Any())
                {
                    vehicle.Images = new List<Images>();

                    foreach (var file in files)
                    {
                        var imagePath = FileUpload.SaveImage("VehicleImages", file);
                        vehicle.Images.Add(new Images { ImagePath = imagePath });
                    }
                }

                await _dbContext.Vehicles.AddAsync(vehicle);
                await _dbContext.SaveChangesAsync();

                var vehicleDtoResult = _mapper.Map<VehicleDTO>(vehicle);
                return CreatedAtAction(nameof(GetVehicleById), new { id = vehicle.VehicleId },
                                        new ApiResponse<VehicleDTO>(vehicleDtoResult, "Vehicle created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<VehicleDTO>.Exception(ex);
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<VehicleDTO>>> UpdateVehicle(int id, [FromForm] Vehicle vehicleUpdate, List<IFormFile>? files)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<VehicleDTO>.BadRequest(ModelState);
                }

                var vehicleExisting = await _dbContext.Vehicles.Include(x => x.Brand).Include(x => x.Images).SingleOrDefaultAsync(x => x.VehicleId == id);
                if (vehicleExisting != null)
                {
                    if (files != null)
                    {
                        if (vehicleExisting.Images != null)
                        {
                            foreach (var image in vehicleExisting.Images)
                            {
                                FileUpload.DeleteImage(image.ImagePath, _env);
                            }
                        }
                        vehicleExisting.Images = new List<Images>();

                        foreach (var file in files)
                        {
                            var imagePath = FileUpload.SaveImage("VehicleImage", file);
                            vehicleExisting.Images.Add(new Images { ImagePath = imagePath });
                        }
                    }
                    _dbContext.Entry(vehicleExisting).CurrentValues.SetValues(vehicleUpdate);
                    await _dbContext.SaveChangesAsync();

                    var updatedDto = _mapper.Map<VehicleDTO>(vehicleUpdate);
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
            var vehicle = await _dbContext.Vehicles.Include(x => x.Brand).Include(x => x.Images).SingleOrDefaultAsync(x => x.VehicleId == id);
            if (vehicle.Images != null)
            {
                foreach (var image in vehicle.Images)
                {
                    FileUpload.DeleteImage(image.ImagePath, _env);
                }
            }
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
