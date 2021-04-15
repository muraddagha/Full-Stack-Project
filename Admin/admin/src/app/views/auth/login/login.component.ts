import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdmin } from 'src/app/shared/models/admin/admin.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted: boolean = false;
  public loginForm: FormGroup;
  public admin: IAdmin;
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.generateForum();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  private generateForum() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  public login() {
    this.submitted = true;
    if (this.loginForm.invalid) return
    this.api.login(this.loginForm.value).subscribe(admin => {
      this.admin = admin;
      console.log(this.admin);
      console.log("Success");

    },
      err => {
        console.log(err);
        switch (err.status) {
          case 400:

            break;
          case 404:
            // this.notifier.notify("error", err.error.message)
            break;
          case 409:
            // this.notifier.notify("error", err.error.message)
            break;
          default:
            break;
        }
        ///...
      }, () => {
        this.authService.login(this.admin);
        this.loginForm.reset();
        this.router.navigate(['/app'])
      })
  }



}
