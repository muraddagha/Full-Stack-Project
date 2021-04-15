using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataService.Data.Entities;
using DataService.Data;
using DataService.Infrastructure.Exceptions;
using System.Linq;

namespace DataService.Services.ShoppingServices
{
    public interface ICategoryService 
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(int id);
        Task<int> GetCategoryCount();
        Task<Category> CreateCategory(Category category);
        Task UpdateCategory(int id,Category category);
        Task RemoveCategory(int id);
    }

    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateCategory(Category category)
        {
            category.AddedDate = DateTime.Now;
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _context.Categories.Include("Department")
                                            .ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) throw new HttpException(404, "Kateqoriya tapılmadı");
            return  category;
        }

        public async Task<int> GetCategoryCount()
        {
            return await _context.Categories.CountAsync();
        }

        public async Task RemoveCategory(int id)
        {
            var category = await GetCategoryById(id);
            category.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCategory(int id,Category category)
        {
            var updateCategory = await GetCategoryById(id);
            updateCategory.Name = category.Name;
            updateCategory.DepartmentId = category.DepartmentId;
            updateCategory.IsPopular = category.IsPopular;
            updateCategory.SoftDeleted = category.SoftDeleted;
            updateCategory.ModifiedBy = category.ModifiedBy;
            updateCategory.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
        }
    }
}
