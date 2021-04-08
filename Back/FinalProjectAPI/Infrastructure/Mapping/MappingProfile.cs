using AutoMapper;
using DataService.Data.Entities;
using FinalProjectAPI.Resource.Category;
using FinalProjectAPI.Resource.Department;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Infrastructure.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Department, DepartmentResource>();
            CreateMap<Category, CategoryResource>();
        }
    }
}
