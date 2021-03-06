import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdmin } from '../models/admin/admin.model';
import { IBrand } from '../models/brand/brand.model';
import { IProduct } from '../models/product/product.model';
import { IBannerResponse } from '../models/response/banner-response.model';
import { IBrandResponse } from '../models/response/brand-response.model';
import { ICategoryResponse } from '../models/response/category-response.model';
import { IDealOfDayResponse } from '../models/response/deal-of-day-response.model';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IDiscountResponse } from '../models/response/discount-response.model';
import { IOptionResponse } from '../models/response/product-option-response.model';
import { IProductResponse } from '../models/response/product-response.model';
import { IServiceResponse } from '../models/response/service-response.model';
import { ISettingResponse } from '../models/response/setting-response.model';
import { IShopCollectionResponse } from '../models/response/shop-collection-response.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //#region Auth
  public login(data: any): Observable<IAdmin> {
    return this.http.post<IAdmin>(environment.apiUrl + 'Admin/Login', data);
  }
  //#endregion

  //#region Department
  public getDepartments(): Observable<IDepartmentResponse> {
    return this.http.get<IDepartmentResponse>(environment.apiUrl + `department/all`)
  }
  public createDepartment(data: any) {
    return this.http.post(environment.apiUrl + `department/create`, data)
  }
  public updateDepartment(id: any, data: any) {
    return this.http.put(environment.apiUrl + `department/${id}`, data)
  }
  public removeDepartment(id: any) {
    return this.http.delete(environment.apiUrl + `department/${id}`)
  }
  public removeDepartmentLogo(name: string, id?: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `department/removeLogo?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `department/removeLogo?name=${name}`)
    }
  }
  //#endregion

  //#region Category
  public getCategories(): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(environment.apiUrl + `category`)
  }
  public createCategory(data: any) {
    return this.http.post(environment.apiUrl + `category/create`, data)
  }
  public updateCategory(id: any, data: any) {
    return this.http.put(environment.apiUrl + `category/${id}`, data)
  }
  public removeCategory(id: any) {
    return this.http.delete(environment.apiUrl + `category/${id}`)
  }
  //#endregion

  //#region Product
  public getProducts(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/all`)
  }
  public getProductById(id): Observable<IProduct> {
    return this.http.get<IProduct>(environment.apiUrl + `product/admin/${id}`)
  }
  public createProduct(data: any) {
    return this.http.post(environment.apiUrl + `product/create`, data)
  }
  public updateProduct(id: any, data: any) {
    return this.http.put(environment.apiUrl + `product/${id}`, data)
  }
  public removeProduct(id: any) {
    return this.http.delete(environment.apiUrl + `product/${id}`)
  }

  public uploadPhoto(formData, productId?, orderBy?) {
    if (productId != null) {
      return this.http.post<any>(environment.apiUrl + `product/upload?productId=${productId}&orderBy=${orderBy}`, formData)
    } else {
      return this.http.post<any>(environment.apiUrl + `product/upload`, formData)
    }
  }
  public removeUploadPhoto(name: any, id?: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `product/remove?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `product/remove?name=${name}`)
    }
  }
  //#endregion

  //#region  Option
  public getProductOptions(id): Observable<IOptionResponse> {
    return this.http.get<IOptionResponse>(environment.apiUrl + `option/${id}`)
  }
  public createOption(data: any) {
    return this.http.post(environment.apiUrl + `option/create/option`, data)
  }
  public createOptionItem(data: any) {
    return this.http.post(environment.apiUrl + `option/create/optionItem`, data)
  }
  public UpdateOption(id, data: any) {
    return this.http.put(environment.apiUrl + `option/${id}`, data)
  }
  public UpdateOptionItem(data: any, id) {
    return this.http.put(environment.apiUrl + `option/item/${id}`, data)
  }
  public RemoveOption(id) {
    return this.http.delete(environment.apiUrl + `option/${id}`,)
  }
  public RemoveOptionItem(id) {
    return this.http.delete(environment.apiUrl + `option/item/${id}`,)
  }
  //#endregion

  //#region Brand
  public getBrands(): Observable<IBrandResponse> {
    return this.http.get<IBrandResponse>(environment.apiUrl + `brand/all`)
  }
  public createBrand(data: any) {
    return this.http.post(environment.apiUrl + `brand/create`, data)
  }
  public updateBrand(id: any, data: any) {
    return this.http.put(environment.apiUrl + `brand/${id}`, data)
  }
  public removeBrand(id: any) {
    return this.http.delete(environment.apiUrl + `brand/${id}`)
  }
  public removeBrandLogo(name: string, id?: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `brand/removeLogo?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `brand/removeLogo?name=${name}`)
    }
  }
  //#endregion

  //#region DealOfDay
  public getDealOfDays(): Observable<IDealOfDayResponse> {
    return this.http.get<IDealOfDayResponse>(environment.apiUrl + `dealOfDay/all`)
  }
  public createDealOfDay(data: any) {
    return this.http.post(environment.apiUrl + `dealOfDay/create`, data)
  }
  public updateDealOfDay(id: any, data: any) {
    return this.http.put(environment.apiUrl + `dealOfDay/${id}`, data)
  }
  public removeDealOfDay(id: any) {
    return this.http.delete(environment.apiUrl + `dealOfDay/${id}`)
  }
  //#endregion

  //#region Setting
  public getSettings(): Observable<ISettingResponse> {
    return this.http.get<ISettingResponse>(environment.apiUrl + `setting/all`)
  }
  public createSetting(data: any) {
    return this.http.post(environment.apiUrl + `setting/create`, data)
  }
  public updateSetting(id: any, data: any) {
    return this.http.put(environment.apiUrl + `setting/${id}`, data)
  }
  public removeSetting(id: any) {
    return this.http.delete(environment.apiUrl + `setting/${id}`)
  }
  public removeSettingLogo(name: string, id?: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `setting/removeLogo?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `setting/removeLogo?name=${name}`)
    }
  }
  //#endregion

  //#region SocialLinks
  public getSocialLinks(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `setting/socialLinksAll`)
  }
  public createSocialLink(data: any) {
    return this.http.post(environment.apiUrl + `setting/createSocialLink`, data)
  }
  public updateSocialLink(id: any, data: any) {
    return this.http.put(environment.apiUrl + `setting/socialLink/${id}`, data)
  }
  public removeSocialLink(id: any) {
    return this.http.delete(environment.apiUrl + `setting/socialLink/${id}`)
  }
  //#endregion

  //#region ShopCollection
  public getShopCollections(): Observable<IShopCollectionResponse> {
    return this.http.get<IShopCollectionResponse>(environment.apiUrl + `shopCollection/all`)
  }
  public createShopCollection(data: any) {
    return this.http.post(environment.apiUrl + `shopCollection/create`, data)
  }
  public updateShopCollection(id: any, data: any) {
    return this.http.put(environment.apiUrl + `shopCollection/${id}`, data)
  }
  public removeShopCollection(id: any) {
    return this.http.delete(environment.apiUrl + `shopCollection/${id}`)
  }
  //#endregion

  //#region Discount
  public getDiscounts(): Observable<IDiscountResponse> {
    return this.http.get<IDiscountResponse>(environment.apiUrl + `discount/all`)
  }
  public createDiscount(data: any) {
    return this.http.post(environment.apiUrl + `discount/create`, data)
  }
  public updateDiscount(id: any, data: any) {
    return this.http.put(environment.apiUrl + `discount/${id}`, data)
  }
  public removeDiscount(id: any) {
    return this.http.delete(environment.apiUrl + `discount/${id}`)
  }
  //#endregion


  //#region Banner
  public getBanners(): Observable<IBannerResponse> {
    return this.http.get<IBannerResponse>(environment.apiUrl + `banner/all`)
  }
  public createBanner(data: any) {
    return this.http.post(environment.apiUrl + `banner/create`, data)
  }
  public updateBanner(id: any, data: any) {
    return this.http.put(environment.apiUrl + `banner/${id}`, data)
  }
  public removeBanner(id: any) {
    return this.http.delete(environment.apiUrl + `banner/${id}`)
  }
  public removeBannerLogo(name: string, id?: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `banner/removeLogo?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `banner/removeLogo?name=${name}`)
    }
  }
  //#endregion

  //#region Service
  public getServices(): Observable<IServiceResponse> {
    return this.http.get<IServiceResponse>(environment.apiUrl + `service/all`)
  }
  public createService(data: any) {
    return this.http.post(environment.apiUrl + `service/create`, data)
  }
  public updateService(id: any, data: any) {
    return this.http.put(environment.apiUrl + `service/${id}`, data)
  }
  public removeService(id: any) {
    return this.http.delete(environment.apiUrl + `service/${id}`)
  }
  //#endregion
}
