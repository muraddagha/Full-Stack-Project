using DataService.Data.Entities;
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
            var department = await _departmentService.GetDepartmentsWithCategory();
            var departmentResource = _mapper.Map<IEnumerable<Department>, IEnumerable<DepartmentResource>>(department);
            return Ok(new { departments = departmentResource });
        }
    }
}
