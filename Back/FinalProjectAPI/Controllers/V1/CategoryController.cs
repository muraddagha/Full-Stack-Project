using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ShoppingServices;
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

        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var category = new Category()
                {
                    Name = resource.Name,
                    DepartmentId = resource.DepartmentId,
                    IsPopular = resource.IsPopular,
                    AddedBy = resource.AddedBy

                };
                await _categoryService.CreateCategory(category);

                return Ok(new { message = "Kateqoriya yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> UpdateCategory([FromRoute] int id,[FromBody] UpdateCategoryResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var category = await _categoryService.GetCategoryById(id);
                category.Name = resource.Name;
                category.DepartmentId = resource.DepartmentId;
                category.IsPopular = resource.IsPopular;
                category.SoftDeleted = resource.SoftDeleted;
                category.ModifiedBy = resource.ModifiedBy;

                await _categoryService.UpdateCategory(category);

                return Ok(new { message = "Kateqoriya yeniləndi" });

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]

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
