using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Resource.AuthResource
{
    public class UserForgetPasswordResource
    {
        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string Email { get; set; }
    }
}
