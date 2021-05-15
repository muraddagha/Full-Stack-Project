import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  public submitted: boolean = false;
  public form: FormGroup;
  private token;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private authService: AuthService) {
    this.token = this.route.snapshot.queryParams.token;
    this.checkToken();
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  get f() {
    return this.form.controls;
  }

  private checkToken() {
    if (this.token == undefined) {
      this.router.navigate(['/error/not-found'])
      return;
    }

    this.apiService.checkToken(this.token).subscribe(s => {

    }, err => {
      this.router.navigate(['/error/not-found']);
    })
  }
  public recovery(): void {
    if (this.form.get('password').value != this.form.get('confirmPassword').value) {
      this.form.get("confirmPassword").setErrors({ 'notsame': true });
      return;
    }
    if (this.form.invalid) return;
    let data = {
      forgetPasswordToken: this.token,
      password: this.form.value.password
    }
    this.apiService.recoveryPassword(data).subscribe(res => {
      this.form.reset(),
        this.notifier.notify("success", "Şifrəniz yeniləndi"),
        // this.authService.
        this.router.navigate(['/auth/login'])

    }, error => {
    })
  }

}
