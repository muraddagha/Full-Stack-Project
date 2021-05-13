using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class Service:BaseEntity
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
