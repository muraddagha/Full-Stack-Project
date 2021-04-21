using FinalProjectAPI.Resource.Brand;
using FinalProjectAPI.Resource.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class ProductResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Sku { get; set; }
        public CategoryResource Category { get; set; }
        public ICollection<string> Photos { get; set; }
    }
}
