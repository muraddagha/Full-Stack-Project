using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.User
{
    public class CreateUserOrderListResource
    {
        public double TotalSalePrice { get; set; }
        public ICollection<CreateUserOrderItemResource> Items { get; set; }
    }
}
