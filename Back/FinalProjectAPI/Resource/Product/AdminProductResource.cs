using FinalProjectAPI.Resource.Category;
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
        public bool InStock { get; set; }
        public bool SoftDeleted { get; set; }
        public CategoryResource Category { get; set; }
        public ICollection<ProductPhotoResource> Photos { get; set; }

        //public ICollection<ProductDiscount> Discounts { get; set; }
        //public ICollection<ProductReview> Reviews { get; set; }

    }
}
