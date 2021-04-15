import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdmin } from '../models/admin/admin.model';
import { IDepartmentResponse } from '../models/response/department-response.model';

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
}
