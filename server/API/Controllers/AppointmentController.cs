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
    public class AppointmentController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        public AppointmentController(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<AppointmentDTO>>>> GetAppointments()
        {
            try
            {
                var list = await _dbContext.Appointments
                    .Include(o => o.Vehicles).Include(o => o.Accounts)
                    .ToListAsync();

                if (list != null && list.Any())
                {
                    var Result = list.Select(o => new AppointmentDTO
                    {
                        Id = o.Id,
                        AppointmentDate = o.AppointmentDate,
                        CreatedDate = o.CreatedDate,
                        AccountId = o.AccountId,
                        Accounts = new AccountDTO
                        {
                            AccountId = o.AccountId,
                            Name = o.Accounts.Name,
                        },
                        VehicleId = o.VehicleId,
                        Vehicles = new include_VehicleDTO
                        {
                            VehicleId = o.Vehicles.VehicleId,
                            Name = o.Vehicles.Name,
                            ModelId = o.Vehicles.ModelId,
                        }

                    });
                    return Ok(new ApiResponse<IEnumerable<AppointmentDTO>>(Result, "Get all Appointment successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<AppointmentDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<AppointmentDTO>.Exception(ex);
            }

        }

        [HttpGet("id")]
        public async Task<ActionResult<ApiResponse<AppointmentDTO>>> GetApmById(int id)
        {
            try
            {
                var o = await _dbContext.Appointments
                    .Include(o => o.Vehicles).Include(o => o.Accounts)
                    .SingleOrDefaultAsync(o => o.Id == id);

                if (o != null)
                {
                    var Result = new AppointmentDTO
                    {
                        Id = o.Id,
                        AppointmentDate = o.AppointmentDate,
                        CreatedDate = o.CreatedDate,
                        AccountId = o.AccountId,
                        Accounts = new AccountDTO
                        {
                            AccountId = o.AccountId,
                            Name = o.Accounts.Name,
                        },
                        VehicleId = o.VehicleId,
                        Vehicles = new include_VehicleDTO
                        {
                            VehicleId = o.Vehicles.VehicleId,
                            Name = o.Vehicles.Name,
                            ModelId = o.Vehicles.ModelId,
                        }
                    };
                    return Ok(new ApiResponse<AppointmentDTO>(Result, "Get Appointment successfully"));
                }
                else
                {
                    return Ok(new ApiResponse<AppointmentDTO>(null, "Not found"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<AppointmentDTO>.Exception(ex);
            }

        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Appointment>>> PostOrder([FromForm] AppointmentBrief appointmentBrief)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Appointment>.BadRequest(ModelState);
            }

            try
            {
                var appointment = _mapper.Map<Appointment>(appointmentBrief);

                await _dbContext.Appointments.AddAsync(appointment);
                await _dbContext.SaveChangesAsync();

                var result = await _dbContext.Appointments
                    .Include(o => o.Vehicles).Include(o => o.Accounts)
                    .SingleOrDefaultAsync(o => o.Id == appointment.Id);

                var appointmentDTO = _mapper.Map<AppointmentDTO>(result);

                return Ok(new ApiResponse<AppointmentDTO>(appointmentDTO, "Appointment created successfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Appointment>.Exception(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Appointment>>> UpdateAppointment(int id, [FromForm] AppointmentBrief appointmentBrief)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<Appointment>.BadRequest(ModelState);
                }

                var aExisting = await _dbContext.Appointments
                    .SingleOrDefaultAsync(x => x.Id == id);
                if (aExisting != null)
                {
                    var aUpdate = _mapper.Map<Appointment>(appointmentBrief);

                    _dbContext.Entry(aExisting).CurrentValues.SetValues(aUpdate);
                    await _dbContext.SaveChangesAsync();

                    return Ok(new ApiResponse<Appointment>(aUpdate, "Updated successfully"));
                }

                return NotFound(new ApiResponse<Appointment>(null, "Not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<Appointment>.Exception(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var list = await _dbContext.Appointments.FindAsync(id);
                if (list != null)
                {
                    _dbContext.Appointments.Remove(list);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Appointment>(list, "Delete successfully"));

                }
                else
                {
                    return Ok(new ApiResponse<OrderCompany>(null, "Not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<OrderCompany>.Exception(ex);

            }
        }
    }
}
