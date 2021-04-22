using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataService.Data.Entities;
using DataService.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ContentServices
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetBrandsAll();
        Task<IEnumerable<Brand>> GetBrands(int limit);
        Task<Brand> GetBrandById(int id);
        Task<Brand> CreateBrand(Brand brand);
        Task UpdateBrand(int id, Brand brand);
        Task RemoveBrand(int id);
    }
    public class BrandService : IBrandService
    {
        private readonly AppDbContext _context;
        public BrandService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<Brand> CreateBrand(Brand brand)
        {
            brand.AddedDate = DateTime.Now;
            await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task<Brand> GetBrandById(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null) throw new HttpException(404, "Brend tapılmadı");
            return brand;
        }

        public async Task<IEnumerable<Brand>> GetBrandsAll()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<IEnumerable<Brand>> GetBrands(int limit)
        {
            return await _context.Brands.Where(b => !b.SoftDeleted)
                                        .Take(limit)
                                        .ToListAsync();
        }

        public async Task RemoveBrand(int id)
        {
            var brand = await GetBrandById(id);
            brand.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBrand(int id, Brand brand)
        {
            var updateBrand = await GetBrandById(id);
            updateBrand.ModifiedDate = DateTime.Now;
            updateBrand.Name = brand.Name;
            updateBrand.SoftDeleted = brand.SoftDeleted;
            await _context.SaveChangesAsync();
        }
    }
}
