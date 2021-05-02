using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.DealOfDays;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class DealOfDayController : BaseController
    {
        private readonly IDealOfDayService _delaOfDayService;

        public DealOfDayController(IDealOfDayService dealOfDayService)
        {
            _delaOfDayService = dealOfDayService;
        }

        [HttpGet]
        [Route("All")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> GetDealOfDaysAll()
        {
            var dealOfDays = await _delaOfDayService.GetDealOfDaysAll();
            var dealOfDaysResource = _mapper.Map<IEnumerable<DealOfDay>, IEnumerable<AdminDealOfDaysResource>>(dealOfDays);
            return Ok(new { dealOfDays = dealOfDaysResource });

        }

        [HttpGet]
        [Route("")]

        public async Task<IActionResult> GetDealOfDays([FromQuery] int limit)
        {
            var dealOfDays = await _delaOfDayService.GetDealOfDays(limit);
            var dealOfDaysResource = _mapper.Map<IEnumerable<DealOfDay>, IEnumerable<DealOfDaysResource>>(dealOfDays);
            return Ok(new { dealOfDays = dealOfDaysResource });

        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateShopCollection([FromBody] CreateDealOfDaysResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var dealOfDayInput = _mapper.Map<CreateDealOfDaysResource, DealOfDay>(resource);
                dealOfDayInput.AddedBy = _admin.Fullname;
                var dealOfDay = await _delaOfDayService.CreateDealOfDay(dealOfDayInput);

                return NoContent();
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateDealOfDay([FromRoute] int id, [FromBody] UpdateDealOfDaysResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var dealOfDay = _mapper.Map<UpdateDealOfDaysResource, DealOfDay>(resource);
                dealOfDay.ModifiedBy = _admin.Fullname;
                await _delaOfDayService.UpdateDealOfDay(id, dealOfDay);
                return NoContent();

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> RemoveDealOfDay([FromRoute] int id)
        {
            try
            {
                await _delaOfDayService.RemoveDealOfDay(id);
                return NoContent();
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

    }
}
