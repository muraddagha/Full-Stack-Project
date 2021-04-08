using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class UserAdress:BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Country { get; set; }

        [Required]
        [MaxLength(200)]
        public string Adress1 { get; set; }
        public string Adress2 { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(200)]
        public string District { get; set; }

        [Required]
        [MaxLength(50)]
        public string Postcode { get; set; }

        public User User { get; set; }
    }
}
