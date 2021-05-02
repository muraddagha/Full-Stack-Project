using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Sale;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class SaleController : BaseController
    {
        private readonly ISaleService _saleService;
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public SaleController(ISaleService saleService,IProductService productService,IUserService userService)
        {
            _saleService = saleService;
            _productService = productService;
            _userService = userService;
        }

        [HttpPost]
        [Route("")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> Sale([FromBody] CreateSaleResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var saleInput = _mapper.Map<CreateSaleResource, Sale>(resource);
                saleInput.UserId = _user.Id;
                saleInput.AddedBy = _user.Name +" "+ _user.Surname;
                foreach (var item in saleInput.SaleItems)
                {
                    item.AddedBy = _user.Name + " " + _user.Surname;
                    item.AddedDate = DateTime.Now;
                    var product = await _productService.GetProductById(item.ProductId);
                    item.Price = product.Price;
                }
                var sale = await _saleService.Sale(saleInput);

                return NoContent();

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
