using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
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
        private readonly ICloudinaryService _cloudinaryService;

        public BrandController(IBrandService brandService, ICloudinaryService cloudinaryService)
        {
            _brandService = brandService;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetBrandsAll()
        {
            var brands = await _brandService.GetBrandsAll();
            var brandsResource = _mapper.Map<IEnumerable<Brand>, IEnumerable<AdminBrandResource>>(brands);
            return Ok(new { brands = brandsResource });
        }

        [HttpGet]
        [Route("")]

        public async Task<IActionResult> GetBrands([FromQuery] int limit)
        {
            var brands = await _brandService.GetBrands(limit);
            var brandsResource = _mapper.Map<IEnumerable<Brand>, IEnumerable<BrandResource>>(brands);
            return Ok(new { brands = brandsResource });

        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateBrand([FromBody] CreateBrandResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var brandInput = _mapper.Map<CreateBrandResource, Brand>(resource);
                brandInput.AddedBy = _admin.Fullname;
                var brand = await _brandService.CreateBrand(brandInput);

                return Ok(new { message = "Brend yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateBrand([FromRoute] int id, [FromBody] UpdateBrandResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var brand = _mapper.Map<UpdateBrandResource, Brand>(resource);
                brand.ModifiedBy = _admin.Fullname;
                await _brandService.UpdateBrand(id, brand);
                return Ok(brand);

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> RemoveBrand([FromRoute] int id)
        {
            try
            {
                await _brandService.RemoveBrand(id);
                return Ok(new { message = "Brend silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

        [HttpDelete]
        [Route("removeLogo")]
        [TypeFilter(typeof(AdminAuth))]


        public IActionResult RemoveUploadedPhoto([FromQuery] string name, [FromQuery] int? id)
        {
            _cloudinaryService.Delete(name);
            if (id!= null)
            {
                _brandService.RemoveBrandLogo((int)id);
            }
            return Ok(new { message = "Şəkil silindi" });
        }


    }
}
