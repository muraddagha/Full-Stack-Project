using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Department
{
    public class AdminDepartmentResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool SoftDeleted { get; set; }

    }
}
