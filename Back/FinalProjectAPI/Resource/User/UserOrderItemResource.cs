using FinalProjectAPI.Resource.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.User
{
    public class UserOrderItemResource
    {
        public ProductResource Product { get; set; }
        public int Count { get; set; }
    }
}
