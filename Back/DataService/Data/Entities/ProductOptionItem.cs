using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class ProductOptionItem:BaseEntity
    {
        [Required]
        public int ProductOptionId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Value { get; set; }
        public ProductOption ProductOption { get; set; }
    }
}
