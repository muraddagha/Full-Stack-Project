using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class UserOrderItem:BaseEntity
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Count { get; set; }
        public int UserOrderListId { get; set; }
        public UserOrderList OrderList { get; set; }
    }
}
