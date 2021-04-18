﻿using DataService.Data.Entities;
using DataService.Enums;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Libs;
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
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IFileManager _fileManager;


        public ProductController(IProductService productService, ICloudinaryService cloudinaryService,IFileManager fileManager)
        {
            _productService = productService;
            _cloudinaryService = cloudinaryService;
            _fileManager = fileManager;
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<AdminProductResource>>(products);
            return Ok(new { products = productResource });
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
                return Ok(new { product=product});
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

        public  IActionResult UploadPhoto(IFormFile file)
        {
            var fileName = _fileManager.Upload(file);
            var publicId = _cloudinaryService.Store(fileName);
            _fileManager.Delete(fileName);

            return Ok(new {
                fileName = publicId,
                src = _cloudinaryService.BuildUrl(publicId)
            });
        }

        [HttpDelete]
        [Route("Remove")]
        public IActionResult RemoveUploadedPhoto([FromQuery] string name)
        {
            _cloudinaryService.Delete(name);
            return Ok(new {message = "Şəkil silindi" });
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
