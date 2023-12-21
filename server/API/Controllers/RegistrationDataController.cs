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
    public class RegistrationDataController : ControllerBase
    {
        private DatabaseContext _dbContext;
        private IMapper _mapper;
        public RegistrationDataController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<RegistrationData>>>> GetRegistrationDatas()
        {
            try
            {
                var list = await _dbContext.RegistrationDatas
                .Include(x => x.Account).Include(x => x.Vehicle)
                .ToListAsync();
                var Result = list.Select(r => new RegistrationData
                {
                    Id = r.Id,
                    VehicleId = r.VehicleId,
                    AccountId = r.AccountId,
                    Vehicle = new Vehicle
                    {
                        VehicleId = r.VehicleId,
                        Name = r.Vehicle.Name,
                        Brand = r.Vehicle.Brand,
                        ModelId = r.Vehicle.ModelId,
                        ManufacturingYear = r.Vehicle.ManufacturingYear,
                        FuelType = r.Vehicle.FuelType,
                        Color = r.Vehicle.Color
                    },
                    Account = new Account
                    {
                        AccountId = r.AccountId,
                        Name = r.Account.Name,
                        Email = r.Account.Email,
                        Phone = r.Account.Phone
                    },
                    RegistrationDate = r.RegistrationDate,
                    ExpiryDate = r.ExpiryDate,
                    RegistrationAuthority = r.RegistrationAuthority
                });

                return Ok(new ApiResponse<IEnumerable<RegistrationData>>(Result, "Get all successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<RegistrationData>.Exception(ex);
            }
        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<RegistrationData>>> GetById(int id)
        {
            try
            {
                var r = await _dbContext.RegistrationDatas
                .Include(x => x.Account).Include(x => x.Vehicle)
                .SingleOrDefaultAsync(x => x.Id == id);
                var Result = new RegistrationData
                {
                    Id = r.Id,
                    VehicleId = r.VehicleId,
                    AccountId = r.AccountId,
                    Vehicle = new Vehicle
                    {
                        VehicleId = r.VehicleId,
                        Name = r.Vehicle.Name,
                        Brand = r.Vehicle.Brand,
                        ModelId = r.Vehicle.ModelId,
                        ManufacturingYear = r.Vehicle.ManufacturingYear,
                        FuelType = r.Vehicle.FuelType,
                        Color = r.Vehicle.Color
                    },
                    Account = new Account
                    {
                        AccountId = r.AccountId,
                        Name = r.Account.Name,
                        Email = r.Account.Email,
                        Phone = r.Account.Phone
                    },
                    RegistrationDate = r.RegistrationDate,
                    ExpiryDate = r.ExpiryDate,
                    RegistrationAuthority = r.RegistrationAuthority
                };

                return Ok(new ApiResponse<RegistrationData>(Result, "Get RegistrationData successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<RegistrationData>.Exception(ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<RegistrationData>>> PostRegistrationData([FromForm] RegistrationDataDTO registrationDataDTO)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<RegistrationData>.BadRequest(ModelState);
            }
            try
            {

                var result = _mapper.Map<RegistrationData>(registrationDataDTO);

                await _dbContext.RegistrationDatas.AddAsync(result);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = result.Id },
                                       new ApiResponse<RegistrationData>(result, "Order created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<RegistrationData>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<RegistrationData>>> UpdateRegistrationData(int id, [FromForm] RegistrationDataDTO itemDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<RegistrationData>.BadRequest(ModelState);
                }

                var itemExisting = await _dbContext.RegistrationDatas
                    .SingleOrDefaultAsync(x => x.Id == id);
                if (itemExisting != null)
                {
                    var itemUpdate = _mapper.Map<RegistrationData>(itemDTO);

                    _dbContext.Entry(itemExisting).CurrentValues.SetValues(itemUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<RegistrationData>(itemUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<RegistrationData>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<RegistrationData>.Exception(ex);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _dbContext.RegistrationDatas
                .Include(x => x.Account).Include(x => x.Vehicle)
                .SingleOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound(new ApiResponse<RegistrationData>(null, "Not found!"));
            }

            _dbContext.RegistrationDatas.Remove(item);
            await _dbContext.SaveChangesAsync();

            return Ok(new ApiResponse<RegistrationData>(item, "Delete successfully!"));
        }
    }
}
