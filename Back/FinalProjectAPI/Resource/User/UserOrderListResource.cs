using DataService.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.User
{
    public class UserOrderListResource
    {
        public int Id { get; set; }
        public double TotalSalePrice { get; set; }
        public string OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<UserOrderItemResource> Items { get; set; }
    }
}
