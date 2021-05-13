using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]

    public class ServiceController : BaseController
    {
        private readonly IServicesService _service;

        public ServiceController(IServicesService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("")]

        public async Task<IActionResult> GetServices([FromQuery] int limit)
        {
            var services = await _service.GetServices(limit);
            var serviceResource = _mapper.Map<IEnumerable<Service>, IEnumerable<ServiceResource>>(services);
            return Ok(new { services = serviceResource }); 
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetServicesAll()
        {
            var services = await _service.GetServicesAll();
            var serviceResources = _mapper.Map<IEnumerable<Service>, IEnumerable<AdminServiceResource>>(services);
            return Ok(new { services = serviceResources });
        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateService([FromBody] CreateServiceResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateServiceResource, Service>(resource);
                input.AddedBy = _admin.Fullname;
                var service = await _service.CreateService(input);

                return Ok(new { message = "Servis yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateService([FromRoute] int id, [FromBody] UpdateServiceResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var service = _mapper.Map<UpdateServiceResource, Service>(resource);
                service.ModifiedBy = _admin.Fullname;
                await _service.UpdateService(id, service);
                return Ok(new {message="Servis yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> RemoveService([FromRoute] int id)
        {
            try
            {
                await _service.RemoveService(id);
                return Ok(new { message = "Servis dekativ edildi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }
    }
}
