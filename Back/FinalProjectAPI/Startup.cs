using DataService.Data;
using DataService.Services;
using DataService.Services.ContentServices;
using DataService.Services.ShoppingServices;
using FinalProjectAPI.Libs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI
{
    public class Startup
    {
        readonly string AllowSpecificOrigins = "_AllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers()
                    .AddNewtonsoftJson(options => options.SerializerSettings
                                                        .ReferenceLoopHandling = Newtonsoft.Json
                                                        .ReferenceLoopHandling.Ignore);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FinalProjectAPI", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin().WithOrigins("http://localhost:4200",
                                                                           "http://localhost:4210")
                                                              .AllowAnyMethod()
                                                              .AllowAnyHeader();

                                  });
            });

            services.AddAutoMapper(typeof(Startup));
            services.AddApiVersioning();

            services.AddDbContext<AppDbContext>(options =>
                   options.UseSqlServer(Configuration.GetConnectionString("Default"),
                   x => x.MigrationsAssembly("DataService")), ServiceLifetime.Transient, ServiceLifetime.Singleton);

            services.AddTransient<IFileManager, FileManager>();
            services.AddTransient<IUserService, UserService>();
            services.AddSingleton<IAdminService, AdminService>();
            services.AddTransient<IDepartmentService,DepartmentService>();
            services.AddTransient<ICategoryService,CategoryService>();
            services.AddTransient<IProductService,ProductService>();
            services.AddTransient<ICloudinaryService,CloudinaryService>();
            services.AddTransient<IBrandService,BrandService>();
            services.AddTransient<IOptionService,OptionService>();
            services.AddTransient<IShopCollectionService,ShopCollectionService>();
            services.AddTransient<IDealOfDayService,DealOfDayService>();
            services.AddTransient<IReviewService,ReviewService>();
            services.AddTransient<ISaleService,SaleService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinalProjectAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
