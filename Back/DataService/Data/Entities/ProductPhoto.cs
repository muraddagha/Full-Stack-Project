using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class ProductPhoto:BaseEntity
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Img { get; set; }

        [MaxLength(200)]
        public string FileName { get; set; }

        [Required]
        public int OrderBy { get; set; }

        public Product Product { get; set; }
    }
}
