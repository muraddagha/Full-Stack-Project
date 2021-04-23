using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class Brand:BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Logo { get; set; }

        [MaxLength(200)]
        public string FileName { get; set; }
    }
}
