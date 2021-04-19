using DataService.Data.Entities;
using DataService.Services.ContentServices;
using FinalProjectAPI.Resource.Brand;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class BrandController : BaseController
    {
        private readonly IBrandService _brandService;

        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet]
        [Route("")]

        public async Task<IActionResult> GetBrands()
        {
            var brands = await _brandService.GetBrands();
            var brandsResource = _mapper.Map<IEnumerable<Brand>, IEnumerable<BrandResource>>(brands);
            return Ok(new { brands = brandsResource });
        }
    }
}
