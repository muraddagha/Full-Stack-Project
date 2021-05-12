using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Discount
{
    public class AdminDiscountResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public double Precentage { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
