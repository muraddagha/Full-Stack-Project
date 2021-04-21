using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class ShopCollection:BaseEntity
    {
        public int? ProductId { get; set; }
        [Required]
        public int OrderBy { get; set; }

        [MaxLength(100)]
        public string Subtitle { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(50)]
        public string BackgroundColor { get; set; }

        [Required]
        [MaxLength(50)]
        public string BtnText { get; set; }

        [Required]
        [MaxLength(100)]
        public string BtnUrl { get; set; }

        public Product Product { get; set; }
    }
}
