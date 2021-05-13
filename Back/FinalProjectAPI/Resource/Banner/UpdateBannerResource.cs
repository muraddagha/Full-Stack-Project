using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.Banner
{
    public class UpdateBannerResource
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(200)]
        public string Subtitle { get; set; }

        [MaxLength(200)]
        public string Text { get; set; }

        [Required]
        [MaxLength(200)]
        public string Image { get; set; }

        [Required]
        [MaxLength(200)]
        public string FileName { get; set; }
        public bool IsBigBanner { get; set; }
        public bool IsMediumBanner { get; set; }
        public bool IsSmallBanner { get; set; }
        public bool SoftDeleted { get; set; }
    }
}
