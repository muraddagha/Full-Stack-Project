using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataService.Data.Entities;
using DataService.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataService.Services.ContentServices
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetBrands();
    }
    public class BrandService : IBrandService
    {
        private readonly AppDbContext _context;
        public BrandService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _context.Brands.Where(b => !b.SoftDeleted)
                                        .ToListAsync();
        }
    }
}
