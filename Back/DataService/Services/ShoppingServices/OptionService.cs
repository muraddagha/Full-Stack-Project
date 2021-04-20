using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using DataService.Data;
using DataService.Data.Entities;
using DataService.Enums;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ShoppingServices
{
    public interface IOptionService
    {
        Task<ProductOption> CreateOption(ProductOption productOption);
        Task<IEnumerable<ProductOption>> GetProductOptionsByProductId(int id);
        Task<ProductOptionItem> CreateOptionItem(ProductOptionItem productOptionItem);
        Task UpdateOption(int id, ProductOption productOption);
        Task UpdateOptionItem(int id, ProductOptionItem productOptionItem);
        Task<ProductOption> GetOptionById(int id);
        Task<ProductOptionItem> GetOptionItemById(int id);
        Task RemoveOption(int id);
        Task RemoveOptionItem(int id);
    }
    public class OptionService : IOptionService
    {
        private readonly AppDbContext _context;

        public OptionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ProductOption> CreateOption(ProductOption productOption)
        {
            productOption.AddedDate = DateTime.Now;
            await _context.ProductOptions.AddAsync(productOption);
            await _context.SaveChangesAsync();
            return productOption;
        }

        public async Task<ProductOptionItem> CreateOptionItem(ProductOptionItem productOptionItem)
        {
            productOptionItem.AddedDate = DateTime.Now;
            await _context.ProductOptionItems.AddAsync(productOptionItem);
            await _context.SaveChangesAsync();
            return productOptionItem;
        }

        public async Task<ProductOption> GetOptionById(int id)
        {
            var option = await _context.ProductOptions.FindAsync(id);
            if (option == null) throw new HttpException(404, "Seçim tapılmadı");
            return option;
        }

        public async Task<ProductOptionItem> GetOptionItemById(int id)
        {
            var optionItem = await _context.ProductOptionItems.FindAsync(id);
            if (optionItem == null) throw new HttpException(404, "Seçim tapılmadı");
            return optionItem;
        }

        public async Task<IEnumerable<ProductOption>> GetProductOptionsByProductId(int id)
        {
            return await _context.ProductOptions.Include("ProductOptionItems")
                                            .Where(p => p.ProductId == id)
                                            .OrderByDescending(o=>o.AddedDate)
                                            .ToListAsync();
        }

        public async Task RemoveOption(int id)
        {
            var option = await GetOptionById(id);
            _context.ProductOptions.Remove(option);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveOptionItem(int id)
        {
            var optionItem = await GetOptionItemById(id);
            _context.ProductOptionItems.Remove(optionItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOption(int id, ProductOption productOption)
        {
            var option = await GetOptionById(id);
            option.ModifiedDate = DateTime.Now;
            option.Title = productOption.Title;
            option.Type = productOption.Type;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOptionItem(int id, ProductOptionItem productOptionItem)
        {
            var optionItem = await GetOptionItemById(id);
            optionItem.ModifiedDate = DateTime.Now;
            optionItem.Name = productOptionItem.Name;
            optionItem.Value = productOptionItem.Value;
            await _context.SaveChangesAsync();
        }
    }
}
