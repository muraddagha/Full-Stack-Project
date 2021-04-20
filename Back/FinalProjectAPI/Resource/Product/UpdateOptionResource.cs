using DataService.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class UpdateOptionResource
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; }
        public OptionsType Type { get; set; }
    }
}
