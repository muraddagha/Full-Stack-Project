using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.AuthResource
{
    public class UserRecoveryPasswordResource
    {
        [Required]
        [MaxLength(200)]
        public string Password { get; set; }

        [MaxLength(200)]
        public string ForgetPasswordToken { get; set; }
    }
}
