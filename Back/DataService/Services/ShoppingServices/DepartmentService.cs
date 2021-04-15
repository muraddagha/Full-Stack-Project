using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataService.Data;
using DataService.Data.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ShoppingServices
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetDepartmentsWithCategory();
        Task<IEnumerable<Department>> GetDepartments();
        Task<Department> CreateDepartment(Department department);
        Task UpdateDepartment(Department department);
        Task RemoveDepartment(int id);
        Task<Department> GetDepartmentById(int id);
    }
    public class DepartmentService : IDepartmentService
    {
        private readonly AppDbContext _context;

        public DepartmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Department> CreateDepartment(Department department)
        {
            department.AddedDate = DateTime.Now;
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<Department> GetDepartmentById(int id)
        {
            var department= await _context.Departments.FindAsync(id);
            if (department == null) throw new HttpException(404, "Şöbə tapılmadı");
            return department;

        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<IEnumerable<Department>> GetDepartmentsWithCategory()
        {
            return await _context.Departments.Include(d=>d.Categories.Where(c=>!c.SoftDeleted))
                                             .Where(s => !s.SoftDeleted)
                                             .ToListAsync();
        }

        public async Task RemoveDepartment(int id)
        {
            var department = await GetDepartmentById(id);
            department.SoftDeleted = true;
            await _context.SaveChangesAsync();

        }

        public async Task UpdateDepartment(Department department)
        {
            department.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
