using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Service
{
    public class AdminServiceResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Icon { get; set; }
        public int OrderBy { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
