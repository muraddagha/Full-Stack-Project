using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class SocialLinks:BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Icon { get; set; }

        [Required]
        [MaxLength(200)]
        public string Endpoint { get; set; }
    }
}
