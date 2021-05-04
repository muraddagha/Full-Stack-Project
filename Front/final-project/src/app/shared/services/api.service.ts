import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdress } from '../models/adress.model';
import { IProductReview } from '../models/product/product-review.model';
import { IProduct } from '../models/product/product.model';
import { IBrandResponse } from '../models/response/brand-response.model';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IProductResponse } from '../models/response/product-response.model';
import { IShopCollectionResponse } from '../models/response/shop-collection-response.model';
import { IUserOrderListResponse } from '../models/response/user-order-list-response.model';
import { IUserOrderList } from '../models/user-order-list.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //#region Sale
  public sale(data: any) {
    return this.http.post(environment.apiUrl + `sale`, data);
  }
  //#endregion
  //#region User
  public getUserAdress(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `user/userAdress`)
  }
  public updateAdress(data: any): Observable<IAdress> {
    return this.http.put<IAdress>(environment.apiUrl + `user/userAdressUpdate`, data)
  }
  public addToOrderList(data: any) {
    return this.http.post(environment.apiUrl + `user/userOrderList`, data);
  }
  public getUserOrderLists(): Observable<IUserOrderListResponse> {
    return this.http.get<IUserOrderListResponse>(environment.apiUrl + `user/userOrderList`);
  }
  public getUserOrderListById(id: any): Observable<IUserOrderList> {
    return this.http.get<IUserOrderList>(environment.apiUrl + `user/${id}`);
  }
  public getUserOrderListByStatus(status: any): Observable<IUserOrderListResponse> {
    return this.http.get<IUserOrderListResponse>(environment.apiUrl + `user/userOrderListByStatus?status=${status}`);
  }
  //#endregion

  //#region Auth
  public login(data: any): Observable<IUser> {
    return this.http.post<IUser>(environment.apiUrl + `auth/login`, data);
  }
  public register(data: any): Observable<IUser> {
    return this.http.post<IUser>(environment.apiUrl + `auth/register`, data);
  }
  //#endregion

  //#region Department
  public getDepartmentsWithCategory(): Observable<IDepartmentResponse> {
    return this.http.get<IDepartmentResponse>(environment.apiUrl + `department`)
  }
  //#endregion

  //#region Product
  public getProductById(id: any): Observable<IProduct> {
    return this.http.get<IProduct>(environment.apiUrl + `product/${id}`)
  }
  public getAllProducts(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/products`)
  }
  public getNewArrivalsProductsByDepartmentId(limit: number, id: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/new-arrivalsByDepartment?limit=${limit}&departmentId=${id}`)
  }
  public getNewArrivalsProduct(limit: number, order: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/new-arrivals?limit=${limit}&order=${order}`)
  }
  public getTrendProducts(limit: number, order: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/trend?limit=${limit}&order=${order}`)
  }
  public getHotDealProducts(limit: number, order: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/hot-deal?limit=${limit}&order=${order}`)
  }
  public getFeaturedProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/featured?limit=${limit}&order=${order}`)
  }
  public getTopSellingProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/top-sell?limit=${limit}&order=${order}`)
  }
  public getProductsByCategoryId(id, limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product?categoryId=${id}&limit=${limit}&order=${order}`)
  }
  public getFilteredProduct(departmentid?: any, brandId?: any, minPrice?: any, maxPrice?: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/filter?departmentId=${departmentid} &brandId=${brandId}&minPrice=${minPrice} &maxPrice=${maxPrice}`)
  }

  //#endregion

  //#region Content
  public getShopCollections(limit: number): Observable<IShopCollectionResponse> {
    return this.http.get<IShopCollectionResponse>(environment.apiUrl + `shopCollection?limit=${limit}`)
  }
  public getBrands(limit: number): Observable<IBrandResponse> {
    return this.http.get<IBrandResponse>(environment.apiUrl + `brand?limit=${limit}`)
  }
  public postReview(data: any, id) {
    return this.http.post(environment.apiUrl + `content/create?productId=${id}`, data)
  }
  //#endregion
}
