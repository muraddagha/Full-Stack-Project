using DataService.Data.Entities;
using DataService.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.AuthResource
{
    public class OrderListResource
    {
        public int OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<UserOrderItem> Items { get; set; }
    }
}
