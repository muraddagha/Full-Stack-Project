using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataService.Data;
using DataService.Data.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataService.Services.ShoppingServices
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetDepartmentsWithCategory();
    }
    public class DepartmentService : IDepartmentService
    {
        private readonly AppDbContext _context;

        public DepartmentService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Department>> GetDepartmentsWithCategory()
        {
            return await _context.Departments.Include("Categories")
                                             .Where(s => !s.SoftDeleted)
                                             .ToListAsync();
        }
    }
}
