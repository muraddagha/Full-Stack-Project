using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Service
{
    public class CreateServiceResource
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(200)]
        public string Subtitle { get; set; }

        [Required]
        [MaxLength(200)]
        public string Icon { get; set; }

        [Required]
        public int OrderBy { get; set; }
    }
}
