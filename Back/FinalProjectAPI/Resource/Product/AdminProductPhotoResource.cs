using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Product
{
    public class AdminProductPhotoResource
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public string FileName { get; set; }
        public int OrderBy { get; set; }
    }
}
