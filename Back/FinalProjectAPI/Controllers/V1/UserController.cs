using DataService.Data.Entities;
using DataService.Services;
using FinalProjectAPI.Infrastructure.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProjectAPI.Resource.User;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("UserAdress")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> GetAdress()
        {
            var userAdress = await _userService.GetUserAdress(_user.Id);
            var userAdressResource = _mapper.Map<UserAdress, AdressResource>(userAdress);
            return Ok(userAdressResource);
        }
    }
}
