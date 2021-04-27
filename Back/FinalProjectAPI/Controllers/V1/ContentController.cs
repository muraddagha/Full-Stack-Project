using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
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
    public class ContentController : BaseController
    {
        private readonly IReviewService _reviewService;
        public ContentController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(UserAuth))]


        public async Task<IActionResult> CreateReview([FromQuery] int productId,[FromBody] CreateProductReviewResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var userInput = _mapper.Map<CreateProductReviewResource, ProductReview>(resource);
                var review = await _reviewService.CreateReview(productId, _user.Id, userInput);
                return Ok(new { message = "Rəy qeydə alındı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
