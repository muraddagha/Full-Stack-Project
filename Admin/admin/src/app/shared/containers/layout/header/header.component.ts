import { Component, OnInit } from '@angular/core';
import { IAdmin } from 'src/app/shared/models/admin/admin.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public admin: IAdmin
  constructor(private authService: AuthService) {
    this.authService.currentAdmin.subscribe(admin => {
      this.admin = admin;
    })
  }

  ngOnInit(): void {
  }

}
