using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using DataService.Data.Entities;
using DataService.Data;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;
using DataService.Enums;

namespace DataService.Services
{
    public interface IUserService
    {
        Task<User> Register(User user);
        Task<User> Login(string email, string password);
        Task RecoveryPassword(string forgetPasswordToken,string password);
        Task<User> CheckToken(string token);
        Task<UserAdress> GetUserAdress(int id);
        Task<UserOrderList> AddUserOrderList(UserOrderList userOrderList);
        Task<IEnumerable<UserOrderList>> GetUserOrderLists(int userId);
        Task<UserOrderList> GetOrderListById(int userId, int id);
        Task<IEnumerable<UserOrderList>> GetUserOrderListByStatus(int userId, OrderStatus status);
    }
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserOrderList> AddUserOrderList(UserOrderList userOrderList)
        {
            userOrderList.AddedDate = DateTime.Now;
            await _context.UserOrderLists.AddAsync(userOrderList);
            await _context.SaveChangesAsync();
            return userOrderList;
        }

        public async Task<User> CheckToken(string token)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Token == token);
        }

        public async Task<UserOrderList> GetOrderListById(int userId, int id)
        {
            var userOrderList = await _context.UserOrderLists.Include("Items.Product.Photos")
                                                             .FirstOrDefaultAsync(u => u.UserId == userId && u.Id == id);
            return userOrderList;
        }

        public async Task<UserAdress> GetUserAdress(int id)
        {
            var user = await _context.Users.Include("Adress").FirstOrDefaultAsync(u => u.Id == id);
            return user.Adress;
                                       
        }

        public async Task<IEnumerable<UserOrderList>> GetUserOrderListByStatus(int userId, OrderStatus status)
        {
            return await _context.UserOrderLists.Include("Items.Product")
                                                            .Where(u => u.UserId == userId)
                                                            .Where(u => u.Status == status)
                                                            .Where(u=>!u.SoftDeleted)
                                                            .ToListAsync();
        }

        public async Task<IEnumerable<UserOrderList>> GetUserOrderLists(int userId)
        {
                                           
            return await _context.UserOrderLists.Include("Items.Product")
                                                .Where(u => u.UserId == userId)
                                                .Where(s => !s.SoftDeleted)
                                                .ToListAsync();
        }



        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.Include("Adress")
                                           .FirstOrDefaultAsync(u => u.Email == email);
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
