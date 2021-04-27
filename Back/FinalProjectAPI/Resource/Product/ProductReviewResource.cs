using FinalProjectAPI.Resource.AuthResource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class ProductReviewResource
    {
        public string Review { get; set; }
        public double Star { get; set; }
        public string User { get; set; }
        public string AddedDate { get; set; }
    }
}
