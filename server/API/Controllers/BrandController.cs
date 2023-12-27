using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        public readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public BrandController(DatabaseContext dbContext, IMapper mapper, IWebHostEnvironment env)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _env = env;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<BrandDTO>>>> GetBrands()
        {
            var brands = await _dbContext.Brands.Include(x => x.Vehicles).ToListAsync();
            var brandDtos = _mapper.Map<List<BrandDTO>>(brands);
            return Ok(new ApiResponse<IEnumerable<BrandDTO>>(brandDtos, "Get all brands successfully"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<BrandDTO>>> GetBrandById(int id)
        {
            var brand = await _dbContext.Brands.Include(x => x.Vehicles).SingleOrDefaultAsync(x => x.BrandId == id);

            if (brand == null)
            {
                return NotFound(new ApiResponse<BrandDTO>(null, "Not found!"));
            }
            var brandDto = _mapper.Map<BrandDTO>(brand);
            return Ok(new ApiResponse<BrandDTO>(brandDto, "Get Brand successfully"));
        }
        [HttpPost]
        [Authorize(Roles = "Admin, Employee")]
        public async Task<ActionResult<ApiResponse<BrandDTO>>> PostBrand([FromForm] Brand brand, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<BrandDTO>.BadRequest(ModelState);
            }

            try
            {
                brand.ImagePath = FileUpload.SaveImage("BrandImage", file);
                await _dbContext.Brands.AddAsync(brand);
                await _dbContext.SaveChangesAsync();

                var brandDto = _mapper.Map<BrandDTO>(brand);
                return CreatedAtAction(nameof(GetBrandById), new { id = brand.BrandId }, new ApiResponse<BrandDTO>(brandDto, "Brand created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<BrandDTO>.Exception(ex);
            }
        }
        [Authorize(Roles = "Admin, Employee")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<BrandDTO>>> UpdateBrand(int id, [FromForm] Brand brandUpdate, IFormFile? file)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<BrandDTO>.BadRequest(ModelState);
                }

                var brand = await _dbContext.Brands.Include(x => x.Vehicles).SingleOrDefaultAsync(x => x.BrandId == id);
                if (brand != null)
                {
                    if (file != null)
                    {
                        if (brand.ImagePath != null)
                        {
                            // Xoá hình ảnh
                            FileUpload.DeleteImage(brand.ImagePath, _env);
                        }
                        brand.ImagePath = FileUpload.SaveImage("BrandImage", file);
                    }

                    // Update product fields here
                    brand.Name = brandUpdate.Name;
                    brand.Description = brandUpdate.Description;

                    _dbContext.Update(brand);
                    await _dbContext.SaveChangesAsync();

                    var brandDto = _mapper.Map<BrandDTO>(brand);
                    return Ok(new ApiResponse<BrandDTO>(brandDto, "Brand updated successfully"));
                }

                return NotFound(new ApiResponse<BrandDTO>(null, "Brand not found"));
            }
            catch (Exception ex)
            {
                return ApiResponse<BrandDTO>.Exception(ex);
            }
        }
        [Authorize(Roles = "Admin, Employee")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _dbContext.Brands.Include(x => x.Vehicles).SingleOrDefaultAsync(x => x.BrandId == id);
            if (brand == null)
            {
                return NotFound(new ApiResponse<BrandDTO>(null, "Not found!", 404));
            }

            if (brand.ImagePath != null)
            {
                // Xoá hình ảnh
                FileUpload.DeleteImage(brand.ImagePath, _env);
            }

            _dbContext.Brands.Remove(brand);
            await _dbContext.SaveChangesAsync();

            var brandDto = _mapper.Map<BrandDTO>(brand);
            return Ok(new ApiResponse<BrandDTO>(brandDto, "Delete Brand successfully!"));
        }
    }
}
