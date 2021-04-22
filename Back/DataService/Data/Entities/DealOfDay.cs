using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class DealOfDay:BaseEntity
    {
        public int? ProductId { get; set; }
        [MaxLength(100)]
        public string Subtitle { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(50)]
        public string BackgroundColor { get; set; }

        public Product Product { get; set; }

    }
}
