import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdmin } from '../models/admin/admin.model';
import { IBrand } from '../models/brand/brand.model';
import { IProduct } from '../models/product/product.model';
import { IBrandResponse } from '../models/response/brand-response.model';
import { ICategoryResponse } from '../models/response/category-response.model';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IOptionResponse } from '../models/response/product-option-response.model';
import { IProductResponse } from '../models/response/product-response.model';
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
  public removeBrandLogo(name: string, id: any) {
    if (id != null) {
      return this.http.delete(environment.apiUrl + `brand/removeLogo?name=${name}&id=${id}`)
    } else {
      return this.http.delete(environment.apiUrl + `brand/removeLogo?name=${name}`)
    }
  }
  //#endregion

  //#region DealOfDay
  public getDealOfDays(): Observable<IBrandResponse> {
    return this.http.get<IBrandResponse>(environment.apiUrl + `dealOfDay/all`)
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
}
