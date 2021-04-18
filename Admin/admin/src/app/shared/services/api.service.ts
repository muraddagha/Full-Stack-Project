import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdmin } from '../models/admin/admin.model';
import { ICategoryResponse } from '../models/response/category-response.model';
import { IDepartmentResponse } from '../models/response/department-response.model';
import { IProductResponse } from '../models/response/product-response.model';


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
  public createProduct(data: any) {
    return this.http.post(environment.apiUrl + `product/create`, data)
  }
  public updateProduct(id: any, data: any) {
    return this.http.put(environment.apiUrl + `product/${id}`, data)
  }
  public removeProduct(id: any) {
    return this.http.delete(environment.apiUrl + `product/${id}`)
  }

  public uploadPhoto(formData) {
    return this.http.post<any>(environment.apiUrl + `product/upload`, formData)
  }
  public removeUploadPhoto(name: any) {
    return this.http.delete(environment.apiUrl + `product/remove?name=${name}`)
  }
  //#endregion


}
