using FinalProjectAPI.Resource.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Department
{
    public class DepartmentResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryResource> Categories { get; set; }
    }
}
