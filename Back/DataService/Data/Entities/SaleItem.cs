using System;
using System.Collections.Generic;
using System.Text;

namespace DataService.Data.Entities
{
   public class SaleItem:BaseEntity
    {
        public int SaleId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public double Price { get; set; }
        public Sale Sale { get; set; }
        public Product Product { get; set; }
    }
}
