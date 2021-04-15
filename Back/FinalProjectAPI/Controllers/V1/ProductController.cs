using DataService.Data.Entities;
using DataService.Enums;
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
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<AdminProductResource>>(products);
            var count = await _productService.GetProductsCount();
            return Ok(new { products = products ,count=count});
        }

        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> CreateProduct([FromBody] CreateProductResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var productInput = _mapper.Map<CreateProductResource, Product>(resource);
                var product = await _productService.CreateProduct(productInput);
                await _productService.CreateProduct(product);

                return Ok(new { message="Məhsul yaradıldı"});
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id,[FromBody] UpdateProductResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var product = _mapper.Map<UpdateProductResource, Product>(resource);
                await _productService.UpdateProduct(id, product);
                return Ok(new { message = "Məhsul yeniləndi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]

        public async Task<IActionResult> RemoveProduct([FromRoute] int id)
        {
            try
            {
                await _productService.RemoveProduct(id);
                return Ok(new { message = "Məhsul silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

        [HttpPost]
        [Route("Upload")]

        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            return Ok();
        }

        [HttpGet]
        [Route("Featured")]
        public async Task<IActionResult> GetFeaturedProducts([FromQuery] int limit,[FromQuery] ProductListing order)
        {
            var products = await _productService.GetFeaturedProducts(limit, order);
            return Ok(products);
        }
    }
}
