import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  public user: IUser;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

}
