using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FinalProjectAPI.Resource.Department
{
    public class CreateDepartmentResource
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(150)]
        public string Icon { get; set; }
    }
}
