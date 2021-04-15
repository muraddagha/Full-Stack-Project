import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAdmin } from '../models/admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentAdminSubject: BehaviorSubject<IAdmin>
  public currentAdmin: Observable<IAdmin>

  constructor() {
    let admin: IAdmin = null;
    if (localStorage.getItem("admin") != null) {
      admin = JSON.parse(localStorage.getItem("admin")) as IAdmin;
    }
    this.currentAdminSubject = new BehaviorSubject<IAdmin>(admin);
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }
  public get CurrentAdminValue(): IAdmin {
    return this.currentAdminSubject?.value;
  }

  login(admin: IAdmin): void {
    localStorage.setItem('admin', JSON.stringify(admin));
    this.currentAdminSubject.next(admin);
  }
  logout(): void {
    localStorage.removeItem('admin');
    this.currentAdminSubject.next(null);
  }
}

