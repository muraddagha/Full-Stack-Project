using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Discount;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class DiscountController : BaseController
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetDiscountsAll()
        {
            var discounts = await _discountService.GetDiscountsAll();
            var discountResources = _mapper.Map<IEnumerable<Discount>, IEnumerable<AdminDiscountResource>>(discounts);
            return Ok(new { discounts = discountResources });
        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateDiscount([FromBody] CreateDiscountResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateDiscountResource, Discount>(resource);
                input.AddedBy = _admin.Fullname;
                var brand = await _discountService.CreateDiscount(input);

                return Ok(new { message = "Endirim yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateDiscount([FromRoute] int id, [FromBody] UpdateDiscountResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var discount = _mapper.Map<UpdateDiscountResource, Discount>(resource);
                discount.ModifiedBy = _admin.Fullname;
                await _discountService.UpdateDiscount(id, discount);
                return Ok(discount);
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> RemoveDiscount([FromRoute] int id)
        {
            try
            {
                await _discountService.RemoveDiscount(id);
                return Ok(new { message = "Endirim dekativ edildi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }
    }
}
