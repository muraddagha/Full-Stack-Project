using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class CreateProductReviewResource
    {
        [Required]
        public double Star { get; set; }

        [Required]
        [MaxLength(500)]
        public string Review { get; set; }
    }
}
