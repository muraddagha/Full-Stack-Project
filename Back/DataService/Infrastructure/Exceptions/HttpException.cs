using System;
using System.Collections.Generic;
using System.Text;

namespace DataService.Infrastructure.Exceptions
{
    public class HttpException : Exception
    {
        public int StatusCode { get; set; }
        public object Response { get; set; }

        public HttpException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
            Response = new
            {
                message
            };
        }
    }
}
