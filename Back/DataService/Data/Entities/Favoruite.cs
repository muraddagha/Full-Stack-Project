using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class Favoruite:BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }

        public Product Product { get; set; }
        public User User { get; set; }
    }
}
