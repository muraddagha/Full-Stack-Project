using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class Banner:BaseEntity
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

    }
}
