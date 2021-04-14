using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using FinalProjectAPI.Resource.AuthResource;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class AdminController : BaseController
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost]
        [Route("Login")]
        
        public async Task<IActionResult> Login([FromBody] LoginResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var admin = await _adminService.Login(resource.Email, resource.Password);
                var adminResource = _mapper.Map<Admin, AdminResource>(admin);
                return Ok(adminResource);
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
