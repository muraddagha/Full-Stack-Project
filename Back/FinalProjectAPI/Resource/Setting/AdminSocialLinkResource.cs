using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Setting
{
    public class AdminSocialLinkResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Endpoint { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
