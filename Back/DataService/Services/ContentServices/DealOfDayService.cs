using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataService.Data.Entities;
using DataService.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ContentServices
{
    public interface IDealOfDayService
    {
        Task<IEnumerable<DealOfDay>> GetDealOfDaysAll();
        Task<IEnumerable<DealOfDay>> GetDealOfDays(int limit);
        Task<DealOfDay> GetDealOfDayById(int id);
        Task<DealOfDay> CreateDealOfDay(DealOfDay dealOfDay);
        Task UpdateDealOfDay(int id, DealOfDay dealOfDay);
        Task RemoveDealOfDay(int id);
    }
    public class DealOfDayService : IDealOfDayService
    {
        private readonly AppDbContext _context;

        public DealOfDayService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<DealOfDay> CreateDealOfDay(DealOfDay dealOfDay)
        {
            dealOfDay.AddedDate = DateTime.Now;
            await _context.DealOfDays.AddAsync(dealOfDay);
            await _context.SaveChangesAsync();
            return dealOfDay;
        }

        public async Task<DealOfDay> GetDealOfDayById(int id)
        {
            var dealOfDay = await _context.DealOfDays.FindAsync(id);
            if (dealOfDay == null) throw new HttpException(404, "DealOfDay tapılmadı");
            return dealOfDay;
        }

        public async Task<IEnumerable<DealOfDay>> GetDealOfDays(int limit)
        {
            return await _context.DealOfDays.Include("Product.Photos")
                                                 .Where(s => !s.SoftDeleted)
                                                 .Take(limit)
                                                 .ToListAsync();
        }

        public async Task<IEnumerable<DealOfDay>> GetDealOfDaysAll()
        {
            return await _context.DealOfDays.Include("Product.Photos")
                                                 .ToListAsync();
        }

        public async Task RemoveDealOfDay(int id)
        {
            var dealOfDay = await GetDealOfDayById(id);
            dealOfDay.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDealOfDay(int id, DealOfDay dealOfDay)
        {
            var updateDealOfDay = await GetDealOfDayById(id);
            updateDealOfDay.Subtitle = dealOfDay.Subtitle;
            updateDealOfDay.Title = dealOfDay.Title;
            updateDealOfDay.BackgroundColor = dealOfDay.BackgroundColor;
            updateDealOfDay.SoftDeleted = dealOfDay.SoftDeleted;
            updateDealOfDay.ProductId = dealOfDay.ProductId;
            updateDealOfDay.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
