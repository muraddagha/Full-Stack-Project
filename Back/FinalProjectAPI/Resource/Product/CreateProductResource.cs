using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class CreateProductResource
    {
        [Required]
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public int? DiscountId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        [MaxLength(100)]
        public string Sku { get; set; }

        [Required]
        public bool InStock { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsTrend { get; set; }
        public bool IsTopSell { get; set; }
        public bool IsHotDeal { get; set; }
        public bool IsNewArrival { get; set; }

        [Required]
        public ICollection<AdminProductPhotoResource> Photos { get; set; }
    }
}
