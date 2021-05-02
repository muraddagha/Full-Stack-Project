using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DataService.Enums;

namespace DataService.Data.Entities
{
    public class UserOrderList:BaseEntity
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalSalePrice { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<UserOrderItem> Items { get; set; }
        public  User User { get; set; }
    }
}
