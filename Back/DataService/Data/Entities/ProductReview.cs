using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class ProductReview:BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public double Star { get; set; }

        [Required]
        [MaxLength(500)]
        public string Review { get; set; }

        public User User { get; set; }
        public Product Product { get; set; }
    }
}
