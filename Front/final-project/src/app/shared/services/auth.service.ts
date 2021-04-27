import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<IUser>
  public currentUser: Observable<IUser>

  constructor() {
    let user: IUser = null;
    if (localStorage.getItem("admin") != null) {
      user = JSON.parse(localStorage.getItem("admin")) as IUser;
    }
    this.currentUserSubject = new BehaviorSubject<IUser>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): IUser {
    return this.currentUserSubject?.value;
  }

  login(user: IUser): void {
    localStorage.setItem('admin', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  logout(): void {
    if (confirm("Əminsiniz?")) {
      localStorage.removeItem('admin');
      this.currentUserSubject.next(null);
    }
  }
}
