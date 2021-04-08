using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DataService.Enums;

namespace DataService.Data.Entities
{
    public class OrderList:BaseEntity
    {
        public int OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<OrderItem> Items { get; set; }
        public ICollection<UserOrderList> UserOrderLists { get; set; }
    }
}
