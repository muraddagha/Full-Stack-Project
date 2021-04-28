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
    if (localStorage.getItem("user") != null) {
      user = JSON.parse(localStorage.getItem("user")) as IUser;
    }
    this.currentUserSubject = new BehaviorSubject<IUser>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): IUser {
    return this.currentUserSubject?.value;
  }

  login(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  logout(): void {
    if (confirm("Əminsiniz?")) {
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
    }
  }
}
