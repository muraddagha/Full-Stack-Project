using AutoMapper;
using DataService.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace FinalProjectAPI.Controllers
{
    [Route("v{ver:apiVersion}/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected IMapper _mapper => HttpContext.RequestServices.GetService<IMapper>();
        protected User _user => RouteData.Values["User"] as User;
        //protected User _admin => RouteData.Values["Admin"] as Admin;

    }
}
