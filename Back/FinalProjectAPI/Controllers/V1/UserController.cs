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
using DataService.Infrastructure.Exceptions;
using DataService.Enums;

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

        [HttpPut]
        [Route("UserAdressUpdate")]
        [TypeFilter(typeof(UserAuth))]

        public async Task<IActionResult> UpdateAdress([FromBody] UpdateAdressResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var userInput = _mapper.Map<UpdateAdressResource, UserAdress>(resource);
                userInput.ModifiedBy = _user.Name + " " + _user.Surname;
                await _userService.UpdateAdress(_user.Id, userInput);
                return Ok(new {message= "Ünvan yeniləndi" });

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPost]
        [Route("UserOrderList")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> AddUserOrderList([FromBody] CreateUserOrderListResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateUserOrderListResource, UserOrderList>(resource);
                input.UserId = _user.Id;
                input.AddedBy = _user.Name +" "+ _user.Surname;
                input.OrderDate = DateTime.Now.AddDays(20);

                foreach (var item in input.Items)
                {
                    item.AddedBy = _user.Name + " " + _user.Surname;
                    item.AddedDate = DateTime.Now;
                }
                var userOrderList = await _userService.AddUserOrderList(input);
                return Ok(userOrderList);
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpGet]
        [Route("UserOrderList")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> GetOrderLists()
        {
            var userOrderLists = await _userService.GetUserOrderLists(_user.Id);
            var userOrderListsResource = _mapper.Map<IEnumerable<UserOrderList>, IEnumerable<UserOrderListResource>>(userOrderLists);
            return Ok(new {userOrderLists= userOrderListsResource });
        }

        [HttpGet]
        [Route("{id}")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> GetOrderListById([FromRoute] int id)
        {
            var userOrderLists = await _userService.GetOrderListById(_user.Id, id);
            var userOrderListsResource = _mapper.Map<UserOrderList, UserOrderListResource>(userOrderLists);
            return Ok(userOrderListsResource);
        }

        [HttpGet]
        [Route("UserOrderListByStatus")]
        [TypeFilter(typeof(UserAuth))]
        public async Task<IActionResult> GetOrderListByStatus([FromQuery] OrderStatus status)
        {
            var userOrderLists = await _userService.GetUserOrderListByStatus(_user.Id,status );
            var userOrderListsResource = _mapper.Map<IEnumerable<UserOrderList>, IEnumerable<UserOrderListResource>>(userOrderLists);
            return Ok(new {userOrderLists= userOrderListsResource });
        }

        [HttpPost]
        [Route("CreateAdress")]
        [TypeFilter(typeof(UserAuth))]

        public async Task<IActionResult> CreateUserAdress([FromBody] CreateUserAdressResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var input = _mapper.Map<CreateUserAdressResource, UserAdress>(resource);
                input.UserId = _user.Id;
                input.AddedBy = _user.Name + " " + _user.Surname;
                var userAdress = await _userService.CreateUserAdress(input);
                return Ok(userAdress);
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }
    }
}
