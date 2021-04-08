using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class Setting:BaseEntity
    {
        [MaxLength(100)]
        public string Adress { get; set; }

        [MaxLength(50)]
        public string Phone { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }

        [MaxLength(200)]
        public string Logo { get; set; }
    }
}
