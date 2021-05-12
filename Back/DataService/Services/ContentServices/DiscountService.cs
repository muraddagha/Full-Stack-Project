using DataService.Data;
using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataService.Services.ContentServices
{
    public interface IDiscountService
    {
        Task<IEnumerable<Discount>> GetDiscountsAll();
        Task<Discount> GetDiscountById(int id);
        Task<Discount> CreateDiscount(Discount discount);
        Task UpdateDiscount(int id, Discount discount);
        Task RemoveDiscount(int id);
    }
    public class DiscountService : IDiscountService
    {
        private readonly AppDbContext _context;

        public DiscountService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Discount> CreateDiscount(Discount discount)
        {
            discount.AddedDate = DateTime.Now;
            await _context.Discounts.AddAsync(discount);
            await _context.SaveChangesAsync();
            return discount;

        }

        public async Task<Discount> GetDiscountById(int id)
        {
            var discount = await _context.Discounts.FindAsync(id);
            if (discount == null) throw new HttpException(404, "Endirim tapılmadı");
            return discount;
        }

        public async Task<IEnumerable<Discount>> GetDiscountsAll()
        {
            return await _context.Discounts.ToListAsync();
        }

        public async Task RemoveDiscount(int id)
        {
            var discount = await GetDiscountById(id);
            discount.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDiscount(int id, Discount discount)
        {
            var updateDiscount = await GetDiscountById(id);
            updateDiscount.Name = discount.Name;
            updateDiscount.StartDate = discount.StartDate;
            updateDiscount.EndDate = discount.EndDate;
            updateDiscount.Precentage = discount.Precentage;
            updateDiscount.SoftDeleted = discount.SoftDeleted;
            updateDiscount.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
