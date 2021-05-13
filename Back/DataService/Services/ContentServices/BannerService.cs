using DataService.Data;
using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataService.Services.ContentServices
{
    public interface IBannerService
    {
        Task<IEnumerable<Banner>> GetBannersAll();
        Task<Banner> GetBannerById(int id);
        Task<Banner> GetBigBanner();
        Task<Banner> GetMediumBanner();
        Task<Banner> GetSmallBanner();
        Task<Banner> CreateBanner(Banner banner);
        Task UpdateBanner(int id, Banner banner);
        Task RemoveBanner(int id);
        void RemoveBannerImage(int id);
    }
   public class BannerService:IBannerService
    {
        private readonly AppDbContext _context;
        public BannerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Banner> CreateBanner(Banner banner)
        {
            banner.AddedDate = DateTime.Now;
            await _context.Banners.AddAsync(banner);
            await _context.SaveChangesAsync();
            return banner;
        }

        public async Task<Banner> GetBannerById(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null) throw new HttpException(404, "Banner tapılmadı");
            return banner;
        }

        public async Task<IEnumerable<Banner>> GetBannersAll()
        {
            return await _context.Banners.ToListAsync();
        }

        public async Task RemoveBanner(int id)
        {
            var banner = await GetBannerById(id);
            banner.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBanner(int id, Banner banner)
        {
            var updateBanner = await GetBannerById(id);
            updateBanner.Title = banner.Title;
            updateBanner.Subtitle = banner.Subtitle;
            updateBanner.Text = banner.Text;
            updateBanner.Image = banner.Image;
            updateBanner.FileName = banner.FileName;
            updateBanner.IsBigBanner = banner.IsBigBanner;
            updateBanner.IsMediumBanner = banner.IsMediumBanner;
            updateBanner.IsSmallBanner = banner.IsSmallBanner;
            updateBanner.SoftDeleted = banner.SoftDeleted;
            updateBanner.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }

        public void RemoveBannerImage(int id)
        {
            var banner = _context.Banners.Find(id);
            banner.Image = "";
            banner.FileName = "";
            _context.SaveChanges();
        }

        public async Task<Banner> GetBigBanner()
        {
            return await _context.Banners.Where(b => b.IsBigBanner)
                                         .Where(b => !b.SoftDeleted)
                                         .FirstOrDefaultAsync();
        }

        public async Task<Banner> GetMediumBanner()
        {
            return await _context.Banners.Where(b => b.IsMediumBanner)
                                         .Where(b => !b.SoftDeleted)
                                         .FirstOrDefaultAsync();
        }

        public async Task<Banner> GetSmallBanner()
        {
            return await _context.Banners.Where(b => b.IsSmallBanner)
                                         .Where(b => !b.SoftDeleted)
                                         .FirstOrDefaultAsync();
        }
    }
}
