using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Category
{
    public class UpdateCategoryResource
    {
        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
