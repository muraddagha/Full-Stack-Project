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
    public interface IUserService
    {
        Task<User> Register(User user);
        Task<User> Login(string email, string password);
        Task RecoveryPassword(string forgetPasswordToken,string password);
    }
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null && CryptoHelper.Crypto.VerifyHashedPassword(user.Password, password)) return user;
            throw new HttpException(404, "E-poçt və ya şifrə yanlışdır");
        }

        public Task RecoveryPassword(string forgetPasswordToken, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            bool checkMail = await _context.Users.AnyAsync(u => u.Email == user.Email);
            
            if (checkMail) throw new HttpException(409, "Bu e-poçt artıq mövcuddur");

            user.Password = CryptoHelper.Crypto.HashPassword(user.Password);
            user.Token = CryptoHelper.Crypto.HashPassword(DateTime.Now.ToString());
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
