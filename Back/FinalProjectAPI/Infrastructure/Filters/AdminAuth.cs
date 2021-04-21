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
    public class AdminAuth: ActionFilterAttribute
    {
        private readonly IAdminService _adminService;

        public AdminAuth(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            bool hasHeader = context.HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues token);

            if (!hasHeader)
            {
                context.Result = new UnauthorizedResult();
            }

            var admin = _adminService.CheckToken(token.ToString()).Result;

            if (admin == null)
            {
                context.Result = new UnauthorizedResult();
            }

            context.RouteData.Values["Admin"] = admin;
        }
    }
}
