using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.Category;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            var categoryResource = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryResource>>(categories);
            var count = await _categoryService.GetCategoryCount();
            return Ok(new { categories = categoryResource,count=count });

        }


        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var categoryInput = _mapper.Map<CreateCategoryResource, Category>(resource);
                categoryInput.AddedBy = _admin.Fullname;
                var category = await _categoryService.CreateCategory(categoryInput);

                return Ok(new { message = "Kateqoriya yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateCategory([FromRoute] int id,[FromBody] UpdateCategoryResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var category = _mapper.Map<UpdateCategoryResource, Category>(resource);
                category.ModifiedBy = _admin.Fullname;
                await _categoryService.UpdateCategory(id, category);
                return Ok(new { message = "Kateqoriya yeniləndi" });

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> RemoveCategory([FromRoute] int id)
        {
            try
            {
                await _categoryService.RemoveCategory(id);
                return Ok(new { message = "Kateqoriya silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

    }
}
