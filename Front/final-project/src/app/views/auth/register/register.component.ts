import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public submitted: boolean = false;
  public registerForm: FormGroup
  public user: IUser;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      surname: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50)]],
      phone: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(200)]],
    })
  }
  get f() {
    return this.registerForm.controls;
  }
  public register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.apiService.register(this.registerForm.value).subscribe(res => {
      this.user = res;
    }, err => { },
      () => {
        this.authService.login(this.user)
        this.router.navigate([''])
      })
  }

}
