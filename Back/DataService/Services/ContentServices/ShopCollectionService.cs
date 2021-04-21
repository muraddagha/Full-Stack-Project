using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataService.Data.Entities;
using DataService.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ContentServices
{
    public interface IShopCollectionService
    {
        Task<IEnumerable<ShopCollection>> GetShopCollectionsAll();
        Task<IEnumerable<ShopCollection>> GetShopCollections(int limit);
        Task<ShopCollection> GetShopCollectionById(int id);
        Task<ShopCollection> CreateShopCollection(ShopCollection shopCollection);
        Task UpdateShopCollection(int id, ShopCollection shopCollection);
        Task RemoveShopCollection(int id);
    }
    public class ShopCollectionService : IShopCollectionService
    {
        private readonly AppDbContext _context;

        public ShopCollectionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ShopCollection> CreateShopCollection(ShopCollection shopCollection)
        {
            shopCollection.AddedDate = DateTime.Now;
            await _context.ShopCollections.AddAsync(shopCollection);
            await _context.SaveChangesAsync();
            return shopCollection;
        }

        public async Task<ShopCollection> GetShopCollectionById(int id)
        {
            var shopCollection = await _context.ShopCollections.FindAsync(id);
            if (shopCollection == null) throw new HttpException(404, "Kolleksiya tapılmadı");
            return shopCollection;
        }

        public async Task<IEnumerable<ShopCollection>> GetShopCollections(int limit)
        {
            return await _context.ShopCollections.Include("Product.Photos")
                                                 .Where(s=>!s.SoftDeleted)
                                                 .Take(limit)
                                                 .ToListAsync();
        }

        public async Task<IEnumerable<ShopCollection>> GetShopCollectionsAll()
        {
            return await _context.ShopCollections.Include("Product.Photos")
                                                 .ToListAsync();
        }

        public async Task RemoveShopCollection(int id)
        {
            var shopCollection = await GetShopCollectionById(id);
            shopCollection.SoftDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateShopCollection(int id, ShopCollection shopCollection)
        {
            var updateShopCollection = await GetShopCollectionById(id);
            updateShopCollection.OrderBy = shopCollection.OrderBy;
            updateShopCollection.Subtitle = shopCollection.Subtitle;
            updateShopCollection.Title = shopCollection.Title;
            updateShopCollection.BackgroundColor = shopCollection.BackgroundColor;
            updateShopCollection.BtnText = shopCollection.BtnText;
            updateShopCollection.BtnUrl = shopCollection.BtnUrl;
            updateShopCollection.SoftDeleted = shopCollection.SoftDeleted;
            updateShopCollection.ProductId = shopCollection.ProductId;
            updateShopCollection.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
