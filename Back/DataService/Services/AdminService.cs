using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using DataService.Data.Entities;
using DataService.Data;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services
{
    public interface IAdminService
    {
        Task<Admin> Login(string email, string password);
        Task<Admin> CheckToken(string token);
        //Task<Admin> Register(Admin admin);
    }
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Admin> CheckToken(string token)
        {
            return await _context.Admins.FirstOrDefaultAsync(u => u.Token == token);
        }

        public async Task<Admin> Login(string email, string password)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == email);
            if (admin != null && CryptoHelper.Crypto.VerifyHashedPassword(admin.Password, password)) return admin;
            throw new HttpException(404, "E-poçt və ya şifrə yanlışdır");
        }

        //public async Task<Admin> Register(Admin admin)
        //{
        //    bool checkMail = await _context.Admins.AnyAsync(a => a.Email == admin.Email);
        //    if (checkMail) throw new HttpException(409, "Bu e-poçt artıq mövcuddur");

        //    admin.Password = CryptoHelper.Crypto.HashPassword(admin.Password);
        //    admin.Token = CryptoHelper.Crypto.HashPassword(DateTime.Now.ToString());
        //    await _context.AddAsync(admin);
        //    await _context.SaveChangesAsync();
        //    return  admin;
        //}
    }
}
