using FinalProjectAPI.Resource.Department;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Category
{
    public class AdminCategoryResource
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public bool SoftDeleted { get; set; }
        public string Name { get; set; }
        public AdminDepartmentResource Department { get; set; }
    }
}
