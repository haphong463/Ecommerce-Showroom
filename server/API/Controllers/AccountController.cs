﻿using API.Data;
using API.DTO;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public AccountController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Index()
        {
            try
            {
                var account = await _dbContext.Accounts.ToListAsync();
                if (account != null && account.Any())
                {
                    return Ok(account);
                }
                else
                {
                    return NotFound("No accounts found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving accounts: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Account>>> GetAccount(int id)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account == null)
                {
                    return Ok(new ApiResponse<Account>(null, "Account not found"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(account, "Get account successfully"));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving account: " + ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult<ApiResponse<Account>>> AddAccount([FromForm] Account account, IFormFile file)
        {
            try
            {
                account.AvatarUrl = FileUpload.SaveImage("AccountImage", file);
                var resource = await _dbContext.Accounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();
                if (resource != null)
                {
                    return Ok(new ApiResponse<Account>(account, "Resource created"));
                }
                else
                {
                    return Ok(new ApiResponse<Account>(null, "Unable to create resource"));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding account: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            try
            {
                var account = await _dbContext.Accounts.FindAsync(id);
                if (account != null)
                {
                    if (account.AvatarUrl != null)
                    {
                        // Xoá hình ảnh
                        FileUpload.DeleteImage(account.AvatarUrl);
                    }
                    _dbContext.Accounts.Remove(account);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Account>(account, "Delete account successfully"));
                  
                }
                else
                {
                    return Ok(new ApiResponse<Account>(null, "Account not found or unable to delete"));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting account: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount([FromForm] Account account, IFormFile? file)
        {
            try
            {
                var existingAccount = await _dbContext.Accounts.FindAsync(account.AccountId);

                if (existingAccount != null)
                {
                    if (file != null)
                    {
                        if (account.AvatarUrl != null)
                        {
                            // Xoá hình ảnh
                            FileUpload.DeleteImage(account.AvatarUrl);
                        }
                        account.AvatarUrl = FileUpload.SaveImage("AccountImage", file);
                    }
                    _dbContext.Entry(existingAccount).CurrentValues.SetValues(account);
                    await _dbContext.SaveChangesAsync();
                    return Ok(new ApiResponse<Account>(account, "Update account successfully"));
                   
                }
                else
                {
                    return Ok(new ApiResponse<Account>(account, "Account not found to update"));

                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating account: " + ex.Message);
            }
        }
    }
}