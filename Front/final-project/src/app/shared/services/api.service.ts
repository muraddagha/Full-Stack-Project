import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product/product.model';
import { IBrandResponse } from '../models/response/brand-response.model';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IProductResponse } from '../models/response/product-response.model';
import { IShopCollectionResponse } from '../models/response/shop-collection-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
  public getFeaturedProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/featured?limit=${limit}&order=${order}`)
  }

  public getTopSellingProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/top-sell?limit=${limit}&order=${order}`)
  }
  public getProductsByCategoryId(id, limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product?categoryId=${id}&limit=${limit}&order=${order}`)
  }

  //#endregion

  //#region Content
  public getShopCollections(limit: number): Observable<IShopCollectionResponse> {
    return this.http.get<IShopCollectionResponse>(environment.apiUrl + `shopCollection?limit=${limit}`)
  }
  public getBrands(limit: number): Observable<IBrandResponse> {
    return this.http.get<IBrandResponse>(environment.apiUrl + `brand?limit=${limit}`)
  }
  //#endregion
}
