using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public class Admin:BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string Fullname { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(200)]
        public string Password { get; set; }

        [MaxLength(200)]
        public string Token { get; set; }

        [MaxLength(200)]
        public string ForgetPasswordToken { get; set; }
    }
}
