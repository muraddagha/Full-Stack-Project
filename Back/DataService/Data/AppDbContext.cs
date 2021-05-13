using System;
using System.Collections.Generic;
using System.Text;
using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataService.Data
{
   public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DealOfDay> DealOfDays { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Favoruite> Favoruites { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<ProductOptionItem> ProductOptionItems { get; set; }
        public DbSet<ProductPhoto> ProductPhotos { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<ShopCollection> ShopCollections { get; set; }
        public DbSet<SocialLinks> SocialLinks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserAdress> UserAdresses { get; set; }
        public DbSet<UserOrderList> UserOrderLists { get; set; }
        public DbSet<UserOrderItem> UserOrderItems { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Banner> Banners { get; set; }
        

    }
}
