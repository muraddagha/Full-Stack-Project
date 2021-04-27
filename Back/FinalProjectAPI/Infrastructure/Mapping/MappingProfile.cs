using AutoMapper;
using DataService.Data.Entities;
using FinalProjectAPI.Resource.AuthResource;
using FinalProjectAPI.Resource.Brand;
using FinalProjectAPI.Resource.Category;
using FinalProjectAPI.Resource.DealOfDays;
using FinalProjectAPI.Resource.Department;
using FinalProjectAPI.Resource.Product;
using FinalProjectAPI.Resource.ShopCollection;
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
                                                .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)));

            CreateMap<Product, ProductDetailsResource>()
                                                .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)))
                                                .ForMember(d => d.Discounts, opt => opt.MapFrom(src => src.Discounts
                                                                                       .Where(d => d.Discount.StartDate <= DateTime.Now && d.Discount.EndDate >= DateTime.Now)
                                                                                       .OrderByDescending(d => d.AddedDate)
                                                                                       .FirstOrDefault().Discount));
            CreateMap<Product, AdminProductResource>();
            CreateMap<ProductPhoto, AdminProductPhotoResource>();
            CreateMap<AdminProductPhotoResource, ProductPhoto>();
            CreateMap<CreateProductResource, Product>();
            CreateMap<UpdateProductResource, Product>();
            CreateMap<ProductOption, ProductOptionResource>();
            CreateMap<ProductOptionItem, ProductOptionItemResource>();
            CreateMap<Discount, DiscountResource>();
            CreateMap<CreateOptionResource, ProductOption>();
            CreateMap<CreateOptionItemResource, ProductOptionItem>();
            CreateMap<UpdateOptionResource, ProductOption>();
            CreateMap<UpdateOptionItemResource, ProductOptionItem>();
            CreateMap<CreateProductReviewResource, ProductReview>();
            CreateMap<ProductReview, ProductReviewResource>().ForMember(d => d.User, opt => opt.MapFrom(user => user.User.Name+" "+user.User.Surname))
                                                             .ForMember(d=>d.AddedDate,opt=>opt.MapFrom(day=>day.AddedDate.ToString("dd-MM-yyyy")));
            CreateMap<UserAdress,UserAdressResource>();
            CreateMap<OrderList, OrderListResource>();
            CreateMap<OrderItem, OrderItemResource>();

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
            CreateMap<Brand, AdminBrandResource>();
            CreateMap<CreateBrandResource, Brand>();
            CreateMap<UpdateBrandResource, Brand>();

            //ShopCollection
            CreateMap<ShopCollection, ShopCollectionResource>();
            CreateMap<ShopCollection, AdminShopCollectionResource>();
            CreateMap<CreateShopCollectionResource, ShopCollection>();
            CreateMap<UpdateShopCollectionResource, ShopCollection>();

            //DealOfDay
            CreateMap<DealOfDay, DealOfDaysResource>();
            CreateMap<DealOfDay, AdminDealOfDaysResource>();
            CreateMap<CreateDealOfDaysResource, DealOfDay>();
            CreateMap<UpdateDealOfDaysResource, DealOfDay>();
        }
    }
}
