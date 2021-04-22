using FinalProjectAPI.Resource.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.DealOfDays
{
    public class UpdateDealOfDaysResource
    {
        [MaxLength(100)]
        public string Subtitle { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(50)]
        public string BackgroundColor { get; set; }

        public ProductResource Product { get; set; }

        public bool SoftDeleted { get; set; }
    }
}
