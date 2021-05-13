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
    public interface IServicesService
    {
        Task<IEnumerable<Service>> GetServicesAll();
        Task<IEnumerable<Service>> GetServices(int limit);
        Task<Service> GetServiceById(int id);
        Task<Service> CreateService(Service service);
        Task UpdateService(int id, Service service);
        Task RemoveService(int id);
    }
    public class ServicesService:IServicesService
    {
        private readonly AppDbContext _context;
        public ServicesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Service> CreateService(Service service)
        {
            service.AddedDate = DateTime.Now;
            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<Service> GetServiceById(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) throw new HttpException(404, "Servis tapılmadı");
            return service;
        }

        public async Task<IEnumerable<Service>> GetServicesAll()
        {
            return await _context.Services.ToListAsync();
        }

        public async Task<IEnumerable<Service>> GetServices(int limit)
        {
            return await _context.Services.Where(b => !b.SoftDeleted)
                                        .Take(limit)
                                        .OrderBy(s=>s.OrderBy)
                                        .ToListAsync();
        }

        public async Task RemoveService(int id)
        {
            var service = await GetServiceById(id);
            service.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateService(int id, Service service)
        {
            var updateservice = await GetServiceById(id);
            updateservice.Title = service.Title;
            updateservice.Subtitle = service.Subtitle;
            updateservice.Icon = service.Icon;
            updateservice.OrderBy = service.OrderBy;
            updateservice.SoftDeleted = service.SoftDeleted;
            updateservice.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
