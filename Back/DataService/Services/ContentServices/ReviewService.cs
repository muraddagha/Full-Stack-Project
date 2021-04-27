using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataService.Data.Entities;
using DataService.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ContentServices
{
    public interface IReviewService
    {
        Task<ProductReview> CreateReview(int productId,int userId,ProductReview productReview);
    }
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;
        public ReviewService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ProductReview> CreateReview(int productId, int userId, ProductReview productReview)
        {
            productReview.AddedDate = DateTime.Now;
            productReview.ProductId = productId;
            productReview.UserId = userId;
            await _context.ProductReviews.AddAsync(productReview);
            await _context.SaveChangesAsync();
            return productReview;
        }

    }
}
