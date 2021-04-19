using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using DataService.Data;
using DataService.Data.Entities;
using DataService.Enums;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ShoppingServices
{
   public interface IProductService
   {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetProductsByCategoryId(int categoryId,int limit,ProductListing order);
        Task<IEnumerable<Product>> GetFeaturedProducts(int limit, ProductListing order);
        Task<IEnumerable<Product>> GetTopSellingProducts(int limit, ProductListing order);
        Task<IEnumerable<Product>> GetTrendProducts(int limit, ProductListing order);
        Task<IEnumerable<Product>> GetHotDealProducts(int limit, ProductListing order);
        Task<IEnumerable<Product>> GetNewArrivalsProducts(int limit, ProductListing order);
        Task<Product> GetProductById(int id);
        Task<Product> CreateProduct(Product product);
        Task UpdateProduct(int id,Product product);
        Task RemoveProduct(int id);
        void ProductListBy(IEnumerable<Product> products, ProductListing order);
        Task<int> GetProductsCount();
        void RemovePhotoById(int? id);
        void AddPhoto(ProductPhoto productPhoto);
    }

    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public void AddPhoto(ProductPhoto productPhoto)
        {
            _context.ProductPhotos.Add(productPhoto);
            _context.SaveChanges();
        }

        public async Task<Product> CreateProduct(Product product)
        {
            product.AddedDate = DateTime.Now;
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.Include("Category")
                                           .Include("Photos")
                                           .Include("Options.ProductOptionItems")
                                           .Include("Discounts.Discount")
                                           .ToListAsync();

        }

        public async Task<IEnumerable<Product>> GetFeaturedProducts(int limit, ProductListing order)
        {
            var products= _context.Products.Include("Photos")
                                           .Include("Discounts.Discount")
                                           .Where(p => p.IsFeatured);

            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();

        }

        public async Task<IEnumerable<Product>> GetHotDealProducts(int limit, ProductListing order)
        {
            var products = _context.Products.Include("Photos")
                                            .Include("Discounts.Discount")
                                           .Where(p => p.IsHotDeal);

            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetNewArrivalsProducts(int limit, ProductListing order)
        {
            //var date = DateTime.Now.AddDays(-10);
            var products = _context.Products.Include("Photos")
                                            .Include("Discounts.Discount")
                                            .Where(p => p.IsHotDeal)
                                            .Where(p => p.AddedDate < DateTime.Now.AddDays(-10));

            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products.Include("Category")
                                                  .Include("Photos")
                                                  .Include("Brand")
                                                  .Include("Options.ProductOptionItems")
                                                  .Include("Discounts.Discount")
                                                  .FirstOrDefaultAsync(p=>p.Id==id);

            if (product == null) throw new HttpException(404, "Məhsul tapılmadı");

            return product;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryId(int categoryId,int limit, ProductListing order)
        {
            var products = _context.Products.Include("Photos")
                                            .Include("Discounts.Discount")
                                            .Where(p => p.IsHotDeal)
                                            .Where(p => p.CategoryId == categoryId);


            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();


        }

        public async Task<int> GetProductsCount()
        {
            return await _context.Products.CountAsync();
                                          
        }

        public async Task<IEnumerable<Product>> GetTopSellingProducts(int limit, ProductListing order)
        {
            var products = _context.Products.Include("Photos")
                                            .Include("Discounts.Discount")
                                            .Where(p => p.IsTopSell);

            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetTrendProducts(int limit, ProductListing order)
        {
            var products = _context.Products.Include("Photos")
                                            .Include("Discounts.Discount")
                                           .Where(p => p.IsTrend);

            ProductListBy(products, order);
            return await products.Take(limit).ToListAsync();
        }

        public void ProductListBy(IEnumerable<Product> products, ProductListing order)
        {
            switch (order)
            {
                case ProductListing.PriceAsc:
                    products.OrderBy(p => p.Price);
                    break;
                case ProductListing.Newness:
                    products.OrderByDescending(p => p.AddedDate);
                    break;
                case ProductListing.PriceDesc:
                    products.OrderByDescending(p => p.Price);
                    break;
                default:
                    break;
            };
        }

        public void RemovePhotoById(int? id)
        {
            ProductPhoto productPhoto=  _context.ProductPhotos.Find(id);
            _context.ProductPhotos.Remove(productPhoto);
             _context.SaveChanges();
        }

        public async Task RemoveProduct(int id)
        {
            var product = await GetProductById(id);
            product.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }


        public async Task UpdateProduct(int id,Product product)
        {
            var updateProduct = await GetProductById(id);

            updateProduct.CategoryId = product.CategoryId;
            updateProduct.BrandId = product.BrandId;
            updateProduct.Name = product.Name;
            updateProduct.Description = product.Description;
            updateProduct.Price = product.Price;
            updateProduct.Sku = product.Sku;
            updateProduct.StarCount = product.StarCount;
            updateProduct.InStock = product.InStock;
            updateProduct.IsTrend = product.IsTrend;
            updateProduct.IsFeatured = product.IsFeatured;
            updateProduct.IsTopSell = product.IsTopSell;
            updateProduct.IsHotDeal = product.IsHotDeal;
            updateProduct.ModifiedBy = product.ModifiedBy;
            updateProduct.SoftDeleted = product.SoftDeleted;
            updateProduct.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
        }
    }
}
