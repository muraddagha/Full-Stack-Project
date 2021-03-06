using FinalProjectAPI.Resource.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.ShopCollection
{
    public class AdminShopCollectionResource
    {

        public int Id { get; set; }
        public int OrderBy { get; set; }
        public string Subtitle { get; set; }
        public string Title { get; set; }
        public string BackgroundColor { get; set; }
        public string BtnText { get; set; }
        public string BtnUrl { get; set; }
        public bool SoftDeleted { get; set; }
        public ProductResource Product { get; set; }


    }
}
