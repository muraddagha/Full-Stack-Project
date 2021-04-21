using DataService.Data.Entities;
using DataService.Infrastructure.Exceptions;
using DataService.Services.ContentServices;
using FinalProjectAPI.Infrastructure.Filters;
using FinalProjectAPI.Resource.ShopCollection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectAPI.Controllers.V1
{
    [ApiVersion("1.0")]
    public class ShopCollectionController : BaseController
    {
        private readonly IShopCollectionService _shopCollectionService;

        public ShopCollectionController(IShopCollectionService shopCollectionService)
        {
            _shopCollectionService = shopCollectionService;
        }

        [HttpGet]
        [Route("All")]
        [TypeFilter(typeof(AdminAuth))]
        public async Task<IActionResult> GetshopCollections()
        {
            var shopCollections = await _shopCollectionService.GetShopCollections();
            var shopCollectionsResource = _mapper.Map<IEnumerable<ShopCollection>, IEnumerable<AdminShopCollectionResource>>(shopCollections);
            return Ok(new { shopCollections = shopCollectionsResource });

        }

        [HttpPost]
        [Route("Create")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> CreateShopCollection([FromBody] CreateShopCollectionResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var collectionInput = _mapper.Map<CreateShopCollectionResource, ShopCollection>(resource);
                collectionInput.AddedBy = _admin.Fullname;
                var collection = await _shopCollectionService.CreateShopCollection(collectionInput);

                return Ok(new { message = "Kateqoriya yaradıldı" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> UpdateShopCollection([FromRoute] int id, [FromBody] UpdateShopCollectionResource resource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var collection = _mapper.Map<UpdateShopCollectionResource, ShopCollection>(resource);
                collection.ModifiedBy = _admin.Fullname;
                await _shopCollectionService.UpdateShopCollection(id, collection);
                return Ok(new { message = "Kolleksiya yeniləndi" });

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [TypeFilter(typeof(AdminAuth))]


        public async Task<IActionResult> RemoveShopCollection([FromRoute] int id)
        {
            try
            {
                await _shopCollectionService.RemoveShopCollection(id);
                return Ok(new { message = "Kolles silindi" });
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }

        }

    }
}
