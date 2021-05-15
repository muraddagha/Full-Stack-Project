using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services;
using FinalProjectAPI.Resource.AuthResource;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class AuthController : BaseController
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var user = await _userService.Login(resource.Email, resource.Password);
                var userResource = _mapper.Map<User, UserResource>(user);
                return Ok(userResource);
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var userInput = _mapper.Map<UserRegisterResource, User>(resource);
                var user = await _userService.Register(userInput);
                var UserResource = _mapper.Map<User, UserResource>(user);
                return Ok(UserResource);
            }
            catch (HttpException e)
            {

                return StatusCode(e.StatusCode, e.Response);
            }
        }
        [HttpPost]
        [Route("forget-password")]

        public async Task<IActionResult> ForgetPassword([FromBody] UserForgetPasswordResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _userService.ForgetPassword(resource.Email);
                return Ok();
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPost]
        [Route("recovery-password")]

        public async Task<IActionResult> RecoveryPassword([FromBody] UserRecoveryPasswordResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _userService.RecoveryPassword(resource.ForgetPasswordToken, resource.Password);
                return Ok();
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpGet]
        [Route("forget-token")]

        public async Task<IActionResult> CheckPasswordToken([FromQuery] string token)
        {
            try
            {
                await _userService.CheckForgetToken(token);

                return Ok();
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
