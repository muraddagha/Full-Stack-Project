import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public submitted: boolean = false;
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  get f() {
    return this.form.controls;
  }

  public send(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    this.apiService.forgetPassword(this.form.value).subscribe(res => {

    }, err => { },
      () => {
        this.submitted = false;
        this.form.reset();
        this.notifier.notify("success", "E-poçtunuza şifrə bərpası üçün məlumat göndərildi")
      })
  }

}
