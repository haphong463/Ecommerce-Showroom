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
    public class BrandController : ControllerBase
    {
        public readonly DatabaseContext _dbContext;
        public BrandController (DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Brand>>>> GetBrands()
        {
            var brands = await _dbContext.Brands.ToListAsync();
            return Ok(new ApiResponse<IEnumerable<Brand>>(brands, "Get all brand successfully"));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Brand>>> GetBrandById(int id)
        {
            var brand = await _dbContext.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound(new ApiResponse<Brand>(null, "Not found!"));
            }

            return Ok(new ApiResponse<Brand>(brand, "Get Brand successfully"));
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Brand>>> PostBrand([FromForm] Brand brand, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return ApiResponse<Brand>.BadRequest(ModelState);
            }

            try
            {
                brand.ImagePath = FileUpload.SaveImage("BrandImage", file);
                await _dbContext.Brands.AddAsync(brand);
                await _dbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(GetBrandById), new { id = brand.BrandId }, new ApiResponse<Brand>(brand, "Brand created successfully", 201));
            }
            catch (Exception ex)
            {
                return ApiResponse<Brand>.Exception(ex);
            }

        }
        [HttpPut]
        public async Task<ActionResult<ApiResponse<Brand>>> UpdateBrand([FromForm] Brand brandUpdate, IFormFile? file)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ApiResponse<Brand>.BadRequest(ModelState);
                }

                var brand = await _dbContext.Brands.FindAsync(brandUpdate.BrandId);
                if (brand != null)
                {
                    if (file != null)
                    {
                        if (brand.ImagePath != null)
                        {
                            // Xoá hình ảnh
                            FileUpload.DeleteImage(brand.ImagePath);
                        }
                        brand.ImagePath = FileUpload.SaveImage("BrandImage", file);
                    }
                    // Update product fields here
                    brand.Name = brandUpdate.Name;
                    brand.Description = brandUpdate.Description;
                    _dbContext.Update(brand);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Brand>(brand, "Brand updated successfully"));

                }
                return NotFound(new ApiResponse<Brand>(null, "Brand not found"));
            }
            catch (Exception ex)
            {

                return ApiResponse<Brand>.Exception(ex);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _dbContext.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound(new ApiResponse<Brand>(null, "Not found!", 404));
            }

            if (brand.ImagePath != null)
            {
                // Xoá hình ảnh
                FileUpload.DeleteImage(brand.ImagePath);
            }

            _dbContext.Brands.Remove(brand);
            await _dbContext.SaveChangesAsync();

            return Ok(new ApiResponse<Brand>(brand, "Delete Brand successfully!"));
        }
    }
}
