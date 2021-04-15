using AutoMapper;
using DataService.Data.Entities;
using FinalProjectAPI.Resource.AuthResource;
using FinalProjectAPI.Resource.Category;
using FinalProjectAPI.Resource.Department;
using FinalProjectAPI.Resource.Product;
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
            //User
            CreateMap<User, UserResource>();
            CreateMap<UserRegisterResource, User>();

            //Admin
            CreateMap<Admin, AdminResource>();

            //Product
            CreateMap<Product, AdminProductResource>()
                                     .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)));
            CreateMap<AdminProductResource, Product>();
            CreateMap<UpdateProductResource, Product>();

            //Categroy
            CreateMap<Category, CategoryResource>();
            CreateMap<CreateCategoryResource, Category>();
            CreateMap<UpdateCategoryResource, Category>();

            //Department
            CreateMap<Department, DepartmentResource>();
            CreateMap<Department, AdminDepartmentResource>();
            CreateMap<CreateDepartmentResource, Department>();
            CreateMap<UpdateDepartmentResource, Department>();
        }
    }
}
