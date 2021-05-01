using FinalProjectAPI.Resource.AuthResource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Sale
{
    public class CreateSaleResource
    {
        public double TotalSalePrice { get; set; }
        public ICollection<SaleItemResource> SaleItems { get; set; }
    }
}
