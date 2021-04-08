using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class User:BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Surname { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Phone { get; set; }

        [Required]
        [MaxLength(200)]
        public string Password { get; set; }

        [MaxLength(200)]
        public string Token { get; set; }

        [MaxLength(200)]
        public string ForgetPasswordToken { get; set; }

        public ICollection<UserAdress> Adress { get; set; }
        public ICollection<UserOrderList> OrderLists { get; set; }
    }
}
