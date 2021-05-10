﻿using FinalProjectAPI.Resource.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.DealOfDays
{
    public class AdminDealOfDaysResource
    {
        public int Id { get; set; }
        public string Subtitle { get; set; }
        public string Title { get; set; }
        public string BackgroundColor { get; set; }
        public ProductResource Product { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
