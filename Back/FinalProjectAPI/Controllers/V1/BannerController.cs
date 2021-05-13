using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Banner;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class BannerController : BaseController
    {
        private readonly IBannerService _bannerService;
        private readonly ICloudinaryService _cloudinaryService;

        public BannerController(IBannerService bannerService, ICloudinaryService cloudinaryService)
        {
            _bannerService = bannerService;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetBannersAll()
        {
            var banners = await _bannerService.GetBannersAll();
            var bannersResource = _mapper.Map<IEnumerable<Banner>, IEnumerable<AdminBannerResource>>(banners);
            return Ok(new { banners = bannersResource });
        }

        [HttpGet]
        [Route("Big")]

        public async Task<IActionResult> GetBigBanner()
        {
            var banner = await _bannerService.GetBigBanner();
            var bannerResource = _mapper.Map<Banner, BannerResource>(banner);
            return Ok(bannerResource);

        }

        [HttpGet]
        [Route("Medium")]

        public async Task<IActionResult> GetMediumBanner()
        {
            var banner = await _bannerService.GetMediumBanner();
            var bannerResource = _mapper.Map<Banner, BannerResource>(banner);
            return Ok(bannerResource);

        }

        [HttpGet]
        [Route("Small")]

        public async Task<IActionResult> GetSmallBanner()
        {
            var banner = await _bannerService.GetSmallBanner();
            var bannerResource = _mapper.Map<Banner, BannerResource>(banner);
            return Ok(bannerResource);

        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateBrand([FromBody] CreateBannerResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateBannerResource, Banner>(resource);
                input.AddedBy = _admin.Fullname;
                var banner = await _bannerService.CreateBanner(input);

                return Ok(new { message = "Banner yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateBrand([FromRoute] int id, [FromBody] UpdateBannerResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var banner = _mapper.Map<UpdateBannerResource, Banner>(resource);
                banner.ModifiedBy = _admin.Fullname;
                await _bannerService.UpdateBanner(id, banner);
                return Ok(new {message="Banner yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }


        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> RemoveBanner([FromRoute] int id)
        {
            try
            {
                await _bannerService.RemoveBanner(id);
                return Ok(new { message = "Banner deaktiv edildi" });
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
            if (id != null)
            {
                _bannerService.RemoveBannerImage((int)id);
            }
            return Ok(new { message = "Şəkil silindi" });
        }
    }
}
