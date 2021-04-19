using DataService.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class ProductOptionItemResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public class ProductOptionResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public OptionsType Type { get; set; }
        public ICollection<ProductOptionItemResource> ProductOptionItems { get; set; }

    }
}
