using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class Department:BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(150)]
        public string Icon { get; set; }

        public bool IsPopular { get; set; }

        [MaxLength(200)]
        public string Logo { get; set; }

        [MaxLength(200)]
        public string FileName { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}
