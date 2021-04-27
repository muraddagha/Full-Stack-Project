import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';
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
  public user: IUser;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(200)]],
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  public login(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.apiService.login(this.loginForm.value).subscribe(res => {
      this.user = res;
    }, err => { },
      () => {
        this.authService.login(this.user);
        this.router.navigate([""])
      })
  }

}
