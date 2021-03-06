using AutoMapper;
using DataService.Data.Entities;
using FinalProjectAPI.Resource.AuthResource;
using FinalProjectAPI.Resource.Banner;
using FinalProjectAPI.Resource.Brand;
using FinalProjectAPI.Resource.Category;
using FinalProjectAPI.Resource.DealOfDays;
using FinalProjectAPI.Resource.Department;
using FinalProjectAPI.Resource.Discount;
using FinalProjectAPI.Resource.Product;
using FinalProjectAPI.Resource.Sale;
using FinalProjectAPI.Resource.Service;
using FinalProjectAPI.Resource.Setting;
using FinalProjectAPI.Resource.ShopCollection;
using FinalProjectAPI.Resource.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiscountResource = FinalProjectAPI.Resource.Discount.DiscountResource;

namespace FinalProjectAPI.Infrastructure.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            //User
            CreateMap<User, UserResource>();
            CreateMap<UserRegisterResource, User>();
            CreateMap<UserAdress, AdressResource>();
            CreateMap<UpdateAdressResource, UserAdress>();
            CreateMap<CreateUserOrderListResource, UserOrderList>();
            CreateMap<CreateUserOrderItemResource, UserOrderItem>();
            CreateMap<UserOrderList, UserOrderListResource>()
                                                        .ForMember(d => d.OrderDate, opt => opt.MapFrom(day => day.OrderDate.ToString("dd-MM-yyyy")));
            CreateMap<UserOrderItem, UserOrderItemResource>();
            CreateMap<CreateUserAdressResource, UserAdress>();

            //Admin
            CreateMap<Admin, AdminResource>();

            //Sale
            CreateMap<CreateSaleResource, Sale>();
            CreateMap<SaleItemResource, SaleItem>();

            //Product
            CreateMap<Product, ProductResource>()
                                                //.ForMember(d => d.Discount.EndDate, opt => opt.MapFrom(day => day.Discount.EndDate.ToString("dd-MM-yyyy")))
                                                .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)));

            CreateMap<Product, ProductDetailsResource>()
                                                .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.OrderBy).Select(p => p.Img)));
                                                //.ForMember(d => d.Discounts, opt => opt.MapFrom(src => src.Discount
                                                //                                       .Where(d => d.Discount.StartDate <= DateTime.Now && d.Discount.EndDate >= DateTime.Now)
                                                //                                       .OrderByDescending(d => d.AddedDate)
                                                //                                       .FirstOrDefault().Discount));
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
            CreateMap<UserOrderList, OrderListResource>();
            CreateMap<UserOrderItem, OrderItemResource>();

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

            //Setting
            CreateMap<Setting, SettingResource>();
            CreateMap<Setting, AdminSettingResource>();
            CreateMap<CreateSettingResource, Setting>();
            CreateMap<UpdateSettingResource, Setting>();
            CreateMap<SocialLinks, SocialLinkResource>();
            CreateMap<SocialLinks, AdminSocialLinkResource>();
            CreateMap<CreateSocialLinkResource, SocialLinks>();
            CreateMap<UpdateSocialLinkResource, SocialLinks>();

            //Discount
            CreateMap<Discount, DiscountResource>();
            CreateMap<Discount, AdminDiscountResource>()
                                .ForMember(d => d.StartDate, opt => opt.MapFrom(day => day.StartDate.ToString("dd-MM-yyyy")))
                                .ForMember(d => d.EndDate, opt => opt.MapFrom(day => day.EndDate.ToString("dd-MM-yyyy")));

            CreateMap<CreateDiscountResource, Discount>();
            CreateMap<UpdateDiscountResource, Discount>();

            //Service
            CreateMap<Service, ServiceResource>();
            CreateMap<Service, AdminServiceResource>();
            CreateMap<CreateServiceResource, Service>();
            CreateMap<UpdateServiceResource, Service>();

            //Banner
            CreateMap<Banner, BannerResource>();
            CreateMap<Banner, AdminBannerResource>();
            CreateMap<CreateBannerResource, Banner>();
            CreateMap<UpdateBannerResource, Banner>();


        }
    }
}
