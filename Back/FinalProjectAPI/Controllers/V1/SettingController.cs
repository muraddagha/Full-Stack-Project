using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Setting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class SettingController : BaseController
    {
        private readonly ISettingService _settingService;
        private readonly ICloudinaryService _cloudinaryService;


        public SettingController(ISettingService settingService,ICloudinaryService cloudinaryService)
        {
            _settingService = settingService;
            _cloudinaryService = cloudinaryService;
        }

        [Route("All")]
        [HttpGet]

        public async Task<IActionResult> GetAllSettings()
        {
            var settings = await _settingService.GetSettingsAll();
            var settingResource = _mapper.Map<IEnumerable<Setting>, IEnumerable<AdminSettingResource>>(settings);
            return Ok(new {settings=settingResource });
        }

        [Route("")]
        [HttpGet]

        public async Task<IActionResult> GetSetting()
        {
            var setting = await _settingService.GetSetting();
            var settingResource = _mapper.Map<Setting ,SettingResource>(setting);
            return Ok(settingResource);
        }

        [Route("Create")]
        [HttpPost]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> CreateSetting([FromBody] CreateSettingResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateSettingResource, Setting>(resource);
                input.AddedBy = _admin.Fullname;
                var setting = await _settingService.CreateSetting(input);
                return Ok(new { message = "Parametr yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [Route("{id}")]
        [HttpPut]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> UpdateSetting([FromRoute] int id,[FromBody] UpdateSettingResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<UpdateSettingResource, Setting>(resource);
                input.ModifiedBy = _admin.Fullname;
                await _settingService.UpdateSetting(id,input);
                return Ok(new { message = "Parametr yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> RemoveSetting([FromRoute] int id)
        {
            try
            {
                await _settingService.RemoveSetting(id);
                return Ok(new { message = "Parametr deaktiv edildi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [Route("SocialLinksAll")]
        [HttpGet]

        public async Task<IActionResult> GetAllSocialLinks()
        {
            var socialLinks = await _settingService.GetSocialLinksAll();
            var socialLinksResource = _mapper.Map<IEnumerable<SocialLinks>, IEnumerable<AdminSocialLinkResource>>(socialLinks);
            return Ok(new { socialLinks = socialLinksResource });
        }

        [Route("SocialLinks")]
        [HttpGet]
        public async Task<IActionResult> GetSocialLink()
        {
            var socialLinks = await _settingService.GetsocialLinks();
            var socialLinkResources = _mapper.Map<IEnumerable<SocialLinks>, IEnumerable<SocialLinkResource>>(socialLinks);
            return Ok(socialLinkResources);
        }

        [Route("CreateSocialLink")]
        [HttpPost]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> CreateSocialLink([FromBody] CreateSocialLinkResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateSocialLinkResource, SocialLinks>(resource);
                input.AddedBy = _admin.Fullname;
                var socialLink = await _settingService.CreateSocialLink(input);
                return Ok(new { message = "Sosial link yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [Route("SocialLink/{id}")]
        [HttpPut]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> UpdateSocialLink([FromRoute] int id, [FromBody] UpdateSocialLinkResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<UpdateSocialLinkResource, SocialLinks>(resource);
                input.ModifiedBy = _admin.Fullname;
                await _settingService.UpdateSocialLink(id, input);
                return Ok(new { message = "Sosial link yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [Route("SocialLink/{id}")]
        [HttpDelete]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> RemoveSocialLink([FromRoute] int id)
        {
            try
            {
                await _settingService.RemoveSocialLink(id);
                return Ok(new { message = "Sosial link deaktiv edildi" });
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
                _settingService.RemoveLogo((int)id);
            }
            return Ok(new { message = "Logo silindi" });
        }
    }
}
