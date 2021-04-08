using System;
using System.Collections.Generic;
using System.Text;

namespace DataService.Data.Entities
{
   public class UserOrderList:BaseEntity
    {
        public int UserId { get; set; }
        public int OrderListId { get; set; }
        public User User { get; set; }
        public OrderList OrderList { get; set; }
    }
}
