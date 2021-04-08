using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class OrderItem:BaseEntity
    {
        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        public int OrderListId { get; set; }
        public OrderList OrderList { get; set; }
    }
}
