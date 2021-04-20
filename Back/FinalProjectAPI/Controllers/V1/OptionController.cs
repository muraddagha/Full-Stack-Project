using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Resource.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
   
    [ApiVersion("1.0")]
    public class OptionController : BaseController
    {
        private IOptionService _optionService;

        public OptionController(IOptionService optionService)
        {
            _optionService = optionService;
        }

        [HttpPost]
        [Route("Create/Option")]

        public async Task<IActionResult> CreateOption([FromBody] CreateOptionResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var optionInput = _mapper.Map<CreateOptionResource, ProductOption>(resource);
                var option = await _optionService.CreateOption(optionInput);
                return Ok(new { message = "Seçim yaradıldı" });


            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPost]
        [Route("Create/OptionItem")]

        public async Task<IActionResult> CreateOptionItem([FromBody] CreateOptionItemResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var optionInput = _mapper.Map<CreateOptionItemResource, ProductOptionItem>(resource);
                var option = await _optionService.CreateOptionItem(optionInput);
                return Ok(new { message = "Seçim dəyəri yaradıldı" });


            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<IActionResult> GetProductOptions([FromRoute] int id)
        {
            var productOptions = await _optionService.GetProductOptionsByProductId(id);
            var productOptionResource = _mapper.Map<IEnumerable<ProductOption>, IEnumerable<ProductOptionResource>>(productOptions);
            return Ok(new { options = productOptionResource });
        }
   
        [HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> UpdateOption([FromRoute] int id,[FromBody] UpdateOptionResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var option = _mapper.Map<UpdateOptionResource, ProductOption>(resource);
                await _optionService.UpdateOption(id, option);
                return Ok(new { message = "Seçim yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("item/{id}")]

        public async Task<IActionResult> UpdateOptionItem([FromRoute] int id, [FromBody] UpdateOptionItemResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var option = _mapper.Map<UpdateOptionItemResource, ProductOptionItem>(resource);
                await _optionService.UpdateOptionItem(id, option);
                return Ok(new { message = "Dəyər yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    
    
        [HttpDelete]
        [Route("{id}")]

        public async Task<IActionResult> RemoveOption([FromRoute] int id)
        {
            try
            {
                await _optionService.RemoveOption(id);
                return Ok(new { message = "Seçim silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("item/{id}")]

        public async Task<IActionResult> RemoveOptionItem([FromRoute] int id)
        {
            try
            {
                await _optionService.RemoveOptionItem(id);
                return Ok(new { message = "Dəyər silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
