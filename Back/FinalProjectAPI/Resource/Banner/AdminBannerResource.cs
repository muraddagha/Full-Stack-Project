using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Banner
{
    public class AdminBannerResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public string FileName { get; set; }
        public bool IsBigBanner { get; set; }
        public bool IsMediumBanner { get; set; }
        public bool IsSmallBanner { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
