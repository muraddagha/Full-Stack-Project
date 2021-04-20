using AutoMapper;
using DataService.Data.Entities;
using FinalProjectAPI.Resource.AuthResource;
using FinalProjectAPI.Resource.Brand;
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
            CreateMap<Product, ProductResource>()
                                            .ForMember(d => d.Discounts, opt => opt.MapFrom(src => src.Discounts
                                                                                       .Where(d => d.Discount.StartDate <= DateTime.Now && d.Discount.EndDate >= DateTime.Now)
                                                                                       .OrderByDescending(d => d.AddedDate)
                                                                                       .FirstOrDefault().Discount));
            CreateMap<Product, AdminProductResource>();
                                                //.ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)));
            CreateMap<ProductPhoto, ProductPhotoResource>();
            CreateMap<ProductPhotoResource, ProductPhoto > ();
            CreateMap<CreateProductResource, Product>();
            CreateMap<UpdateProductResource, Product>();
            CreateMap<ProductOption, ProductOptionResource>();
            CreateMap<ProductOptionItem, ProductOptionItemResource>();
            CreateMap<Discount, DiscountResource>();
            CreateMap<CreateOptionResource, ProductOption>();
            CreateMap<CreateOptionItemResource, ProductOptionItem>();
            CreateMap<UpdateOptionResource, ProductOption>();
            CreateMap<UpdateOptionItemResource, ProductOptionItem>();

            //Categroy
            CreateMap<Category, CategoryResource>();
            CreateMap<CreateCategoryResource, Category>();
            CreateMap<UpdateCategoryResource, Category>();

            //Department
            CreateMap<Department, DepartmentResource>();
            CreateMap<Department, AdminDepartmentResource>();
            CreateMap<CreateDepartmentResource, Department>();
            CreateMap<UpdateDepartmentResource, Department>();


            //Brand
            CreateMap<Brand, BrandResource>();
        }
    }
}
