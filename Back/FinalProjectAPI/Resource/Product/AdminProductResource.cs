using FinalProjectAPI.Resource.Brand;
using FinalProjectAPI.Resource.Category;
using FinalProjectAPI.Resource.Discount;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class AdminProductResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Sku { get; set; }
        public string Description { get; set; }
        public bool InStock { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsTrend { get; set; }
        public bool IsTopSell { get; set; }
        public bool IsHotDeal { get; set; }
        public bool IsNewArrival { get; set; }
        public bool SoftDeleted { get; set; }
        public BrandResource Brand { get; set; }
        public CategoryResource Category { get; set; }
        public AdminDiscountResource Discount { get; set; }
        public ICollection<AdminProductPhotoResource> Photos { get; set; }
    }
}
