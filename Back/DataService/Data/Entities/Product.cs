﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class Product:BaseEntity
    {
        [Required]
        public int CategoryId { get; set; }

        public int BrandId { get; set; }

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
        public double StarCount { get; set; }

        [Required]
        public bool InStock { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsTrend { get; set; }
        public bool IsTopSell { get; set; }
        public bool IsHotDeal { get; set; }
        public Category Category { get; set; }
        public Brand Brand { get; set; }
        public ICollection<ProductPhoto> Photos { get; set; }
        public ICollection<ProductOption> Options { get; set; }
        public ICollection<ProductDiscount> Discounts  { get; set; }
        public ICollection<ProductReview> Reviews { get; set; }
        public ICollection<Favoruite> Favoruites { get; set; }

    }
}
