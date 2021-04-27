using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Infrastructure.Filters
{
    public class UserAuth : ActionFilterAttribute
    {
        private readonly IUserService _userService;

        public UserAuth(IUserService userService)
        {
            _userService = userService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            bool hasHeader = context.HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues token);

            if (!hasHeader)
            {
                context.Result = new UnauthorizedResult();
            }

            var user = _userService.CheckToken(token.ToString()).Result;

            if (user == null)
            {
                context.Result = new UnauthorizedResult();
            }

            context.RouteData.Values["User"] = user;
        }
    }
}
