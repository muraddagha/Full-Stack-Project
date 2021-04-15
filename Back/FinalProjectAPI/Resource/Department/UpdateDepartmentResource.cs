using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Department
{
    public class UpdateDepartmentResource
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(150)]
        public string Icon { get; set; }
        public bool SoftDeleted { get; set; }

        [MaxLength(50)]
        public string ModifiedBy { get; set; }
    }
}
