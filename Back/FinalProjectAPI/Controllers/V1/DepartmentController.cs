using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Resource.Department;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class DepartmentController : BaseController
    {
        private readonly IDepartmentService _departmentService;
        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetDepartmentWithCategory()
        {
            var departments = await _departmentService.GetDepartmentsWithCategory();
            var departmentResource = _mapper.Map<IEnumerable<Department>, IEnumerable<DepartmentResource>>(departments);
            return Ok(new { departments = departmentResource });
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _departmentService.GetDepartments();
            var departmentResource = _mapper.Map<IEnumerable<Department>, IEnumerable<AdminDepartmentResource>>(departments);
            return Ok(new { departments = departmentResource });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var department = new Department()
                {
                    Name = resource.Name,
                    Icon = resource.Icon,
                    AddedBy=resource.AddedBy
                };
                await _departmentService.CreateDepartment(department);

                return Ok(new { message = "Şöbə yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    
        [HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> UpdateDepartment([FromRoute]int id,[FromBody] UpdateDepartmentResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var department = await _departmentService.GetDepartmentById(id);
                department.Name = resource.Name;
                department.Icon = resource.Icon;
                department.SoftDeleted = resource.SoftDeleted;
                department.ModifiedBy = resource.ModifiedBy;
                await _departmentService.UpdateDepartment(department);
                return Ok(new { message = "Şöbə yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveDepartment([FromRoute] int id)
        {
            try
            {
                await _departmentService.RemoveDepartment(id);

                return Ok(new { message = "Şöbə Silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }

}
