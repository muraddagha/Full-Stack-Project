import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDepartmentResponse } from '../models/response/department-response.model';

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
}
