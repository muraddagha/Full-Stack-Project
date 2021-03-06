using DataService.Data.Entities;
using DataService.Enums;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Infrastructure.Filters;
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


        public ProductController(IProductService productService, ICloudinaryService cloudinaryService,
                                 IFileManager fileManager)
        {
            _productService = productService;
            _cloudinaryService = cloudinaryService;
            _fileManager = fileManager;
        }

        [HttpGet]
        [Route("Products")]

        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }

        [HttpGet]
        [Route("All")]

        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<AdminProductResource>>(products);
            return Ok(new { products = productResource });
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            var product = await _productService.GetProductById(id);
            var productResource = _mapper.Map<Product,ProductDetailsResource>(product);
            return Ok(productResource);
        }

        [HttpGet]
        [Route("Admin/{id}")]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> GetAdminProductById([FromRoute] int id)
        {
            var product = await _productService.GetProductById(id);
            var productResource = _mapper.Map<Product, AdminProductResource>(product);
            return Ok(productResource);
        }

        [HttpGet]
        [Route("")]

        public async Task<IActionResult> GetProductsByCategoryId([FromQuery] int categoryId, [FromQuery] int limit,[FromQuery] ProductListing order)
        {
            var products = await _productService.GetProductsByCategoryId(categoryId, limit,order);
            var productsResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products=productsResource});
        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> CreateProduct([FromBody] CreateProductResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var productInput = _mapper.Map<CreateProductResource, Product>(resource);
                productInput.AddedBy = _admin.Fullname;
                var product = await _productService.CreateProduct(productInput);
                return Ok(new { message="Məhsul yaradıldı"});
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id,[FromBody] UpdateProductResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var product = _mapper.Map<UpdateProductResource, Product>(resource);
                product.ModifiedBy = _admin.Fullname;
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
        [TypeFilter(typeof(AdminAuth))]

        public async Task<IActionResult> RemoveProduct([FromRoute] int id)
        {
            try
            {
                await _productService.RemoveProduct(id);
                return Ok(new { message = "Məhsul deaktiv edildi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

        [HttpPost]
        [Route("Upload")]
        [TypeFilter(typeof(AdminAuth))]
        public IActionResult UploadPhoto(IFormFile file,[FromQuery] int? productId,[FromQuery] int? orderBy)
        {
            var fileName = _fileManager.Upload(file);
            var publicId = _cloudinaryService.Store(fileName);
            _fileManager.Delete(fileName);

            if (productId != null)
            {
                ProductPhoto productPhoto = new ProductPhoto()
                {
                    AddedDate = DateTime.Now,
                    Img = _cloudinaryService.BuildUrl(publicId),
                    FileName = publicId,
                    ProductId = (int)productId,
                    OrderBy = (int)orderBy
                };
                _productService.AddPhoto(productPhoto);
            }

            return Ok(new {
                fileName = publicId,
                src = _cloudinaryService.BuildUrl(publicId)
            });
        }

        [HttpDelete]
        [Route("Remove")]
        [TypeFilter(typeof(AdminAuth))]

        public IActionResult RemoveUploadedPhoto([FromQuery] string name,[FromQuery] int? id)
        {
            if (id != null)
            {
                _productService.RemovePhotoById(id);
            }
            _cloudinaryService.Delete(name);
            return Ok(new {message = "Şəkil silindi" });
        }

        [HttpGet]
        [Route("Featured")]
        public async Task<IActionResult> GetFeaturedProducts([FromQuery] int limit,[FromQuery] ProductListing order)
        {
            var products = await _productService.GetFeaturedProducts(limit, order);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }

        [HttpGet]
        [Route("Top-sell")]
        public async Task<IActionResult> GetTopSellingProducts([FromQuery] int limit, [FromQuery] ProductListing order)
        {
            var products = await _productService.GetTopSellingProducts(limit, order);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }


        [HttpGet]
        [Route("New-arrivalsByDepartment")]

        public async Task<IActionResult> GetNewArrivalsProductsByDepartmentId([FromQuery] int limit,[FromQuery]int departmentId)
        {
            var products = await _productService.GetNewArrivalsProductsByDepartmentId(limit, departmentId);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products=productResource });
        }

        [HttpGet]
        [Route("New-arrivals")]

        public async Task<IActionResult> GetNewArrivalsProducts([FromQuery] int limit,[FromQuery] ProductListing order)
        {
            var products = await _productService.GetNewArrivalsProducts(limit,order);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }


        [HttpGet]
        [Route("Trend")]

        public async Task<IActionResult> GetTrendProducts([FromQuery] int limit, [FromQuery] ProductListing order)
        {
            var products = await _productService.GetTrendProducts(limit, order);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }

        [HttpGet]
        [Route("Hot-deal")]

        public async Task<IActionResult> GetHotDealProducts([FromQuery] int limit, [FromQuery] ProductListing order)
        {
            var products = await _productService.GetHotDealProducts(limit, order);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productResource });
        }


        [HttpGet]
        [Route("Department/{id}")]

        public async Task<IActionResult> GetProductsByDepartmentId([FromRoute] int id)
        {
            var products = await _productService.GetProductsByDepartmentId(id);
            var productsResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new { products = productsResource });
        }

        [HttpGet]
        [Route("Filter")]

        public async Task<IActionResult> GetFilteredProduct([FromQuery] int[] departmentId, [FromQuery] int[] brandId, 
                                                            [FromQuery] double? minPrice, [FromQuery] double? maxPrice)
        {
            var products = await _productService.GetFilteredProduct(departmentId, brandId, minPrice, maxPrice);
            var productResource = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(new {products= productResource });
        }


    }
}
