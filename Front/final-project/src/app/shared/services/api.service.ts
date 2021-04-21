import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IProductResponse } from '../models/response/product-response.model';

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
  public getNewArrivalsProduct(limit: number, id: any): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/new-arrivals?limit=${limit}&departmentId=${id}`)
  }
  public getFeaturedProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/featured?limit=${limit}&order=${order}`)
  }

  public getTopSellingProducts(limit: number, order: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(environment.apiUrl + `product/top-sell?limit=${limit}&order=${order}`)
  }
  //#endregion
}
