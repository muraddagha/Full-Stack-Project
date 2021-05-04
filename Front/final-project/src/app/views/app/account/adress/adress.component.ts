import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IAdress } from 'src/app/shared/models/adress.model';
import { IUser } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  public user: IUser;
  public submitted: boolean = false;
  public adressForm: FormGroup
  public adress: IAdress;
  constructor(private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private element: ElementRef,
    private notifier: NotifierService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.generateForm();
    this.getAdress();
  }
  get f() {
    return this.adressForm.controls;
  }
  generateForm(): void {
    this.adressForm = this.fb.group({
      country: ["", [Validators.required, Validators.maxLength(50)]],
      city: ["", [Validators.required, Validators.maxLength(50)]],
      adress1: ["", [Validators.required, Validators.maxLength(200)]],
      adress2: ["", [Validators.maxLength(200)]],
      postCode: ["", [Validators.maxLength(50)]],
    })
  }
  public updateAdress($event, adress: IAdress): void {
    $event.preventDefault();
    this.adressForm.patchValue({
      country: adress["country"],
      adress1: adress["adress1"],
      adress2: adress["adress2"],
      city: adress["city"],
      postCode: adress["postcode"],
    })
  }

  public update(): void {
    this.submitted = true;
    if (this.adressForm.invalid) return;
    this.apiService.updateAdress(this.adressForm.value).subscribe(res => {
    }, err => {

    },
      () => {
        this.getAdress();
        this.element.nativeElement.querySelector(".btn-close").click();
        this.notifier.notify("success", "Ünvan yeniləndi");
      })
  }

  public getAdress(): void {
    this.apiService.getUserAdress().subscribe(res => {
      this.adress = res
    })
  }

}
