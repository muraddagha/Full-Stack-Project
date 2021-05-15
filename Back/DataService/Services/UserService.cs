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
using DataService.Services.Rest;

namespace DataService.Services
{
    public interface IUserService
    {
        Task<User> Register(User user);
        Task<User> Login(string email, string password);
        Task RecoveryPassword(string forgetPasswordToken,string password);
        Task ForgetPassword(string email);
        Task<User> CheckToken(string token);
        Task<bool> CheckForgetToken(string forgetToken);
        Task<UserAdress> GetUserAdress(int id);
        Task<UserAdress> CreateUserAdress(UserAdress userAdress);
        Task UpdateAdress(int userId,UserAdress userAdress);
        Task<UserOrderList> AddUserOrderList(UserOrderList userOrderList);
        Task<IEnumerable<UserOrderList>> GetUserOrderLists(int userId);
        Task<UserOrderList> GetOrderListById(int userId, int id);
        Task<IEnumerable<UserOrderList>> GetUserOrderListByStatus(int userId, OrderStatus status);
    }
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        public UserService(AppDbContext context,IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<UserOrderList> AddUserOrderList(UserOrderList userOrderList)
        {
            userOrderList.AddedDate = DateTime.Now;
            await _context.UserOrderLists.AddAsync(userOrderList);
            await _context.SaveChangesAsync();
            return userOrderList;
        }

        public async Task<bool> CheckForgetToken(string forgetToken)
        {
            bool check = await _context.Users.AnyAsync(u => u.ForgetPasswordToken == forgetToken);
            if (!check) throw new HttpException(404, "Token tapılmadı");

            return true;
        }

        public async Task<User> CheckToken(string token)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Token == token);
        }

        public async Task<UserAdress> CreateUserAdress(UserAdress userAdress)
        {
            userAdress.AddedDate = DateTime.Now;
            await _context.UserAdresses.AddAsync(userAdress);
            await _context.SaveChangesAsync();
            return userAdress;
        }

        public async Task ForgetPassword(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            var userFullname = user.Name + " " + user.Surname;
            if (user == null) throw new HttpException(404, "E-poçt tapılmadı");
            user.ForgetPasswordToken = Guid.NewGuid().ToString();
            await _context.SaveChangesAsync();
            await _emailService.SendAsync(email, userFullname, "d-67c3fa18d271401ca3d5a5d21f10ac7e", new
            {
                subject = "Şifrə bərpası",
                fullname = userFullname,
                btnText = "Şifrəni yenilə",
                text = "Hesabınızın şifrəsini yeniləmək istədiyiniz barədə e-poçt aldıq. Hesabınızda bir dəyişiklik baş verməyib. Şifrənizi yeniləmək üçün klik edin. ",
                btnUrl = $"http://localhost:4210/auth/recovery-password?token={user.ForgetPasswordToken}"
            });
        }

        public async Task<UserOrderList> GetOrderListById(int userId, int id)
        {
            var userOrderList = await _context.UserOrderLists.Include("Items.Product.Photos")
                                                             .FirstOrDefaultAsync(u => u.UserId == userId && u.Id == id);
            return userOrderList;
        }

        public async Task<UserAdress> GetUserAdress(int userId)
        {
            var userAdress = await _context.UserAdresses.FirstOrDefaultAsync(u =>u.UserId==userId);
            return userAdress;
                                       
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
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null && CryptoHelper.Crypto.VerifyHashedPassword(user.Password, password)) return user;
            throw new HttpException(404, "E-poçt və ya şifrə yanlışdır");
        }

        public async Task RecoveryPassword(string forgetPasswordToken, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ForgetPasswordToken == forgetPasswordToken);
            if (user == null) throw new HttpException(404, "Token tapılmadı");
            user.Password = CryptoHelper.Crypto.HashPassword(password);
            user.ForgetPasswordToken = null;
            user.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
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

        public async Task UpdateAdress(int userId, UserAdress userAdress)
        {
            var updateAdress = await _context.UserAdresses.FirstOrDefaultAsync(u => u.UserId == userId);

            if (userAdress == null) throw new HttpException(404, "İstifadəçi ünvanı tapılmadı");

            updateAdress.Country = userAdress.Country;
            updateAdress.City = userAdress.City;
            updateAdress.Adress1 = userAdress.Adress1;
            updateAdress.Adress2 = userAdress.Adress2;
            updateAdress.Postcode = userAdress.Postcode;
            updateAdress.ModifiedDate = DateTime.Now;
            updateAdress.ModifiedBy = userAdress.ModifiedBy;

            await _context.SaveChangesAsync();
        }
    }
}
