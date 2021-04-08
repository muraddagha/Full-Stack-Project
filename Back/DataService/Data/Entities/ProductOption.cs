using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DataService.Enums;

namespace DataService.Data.Entities
{
   public class ProductOption:BaseEntity
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; }
        public OptionsType Type { get; set; }
        public Product Product { get; set; }

        public ICollection<ProductOptionItem> ProductOptionItems { get; set; }

    }
}
