import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IAdress } from 'src/app/shared/models/adress.model';
import { IBasket } from 'src/app/shared/models/basket.model';
import { ISaleProduct } from 'src/app/shared/models/product/saleItem.model';
import { IUser } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public submitted: boolean = false;
  public billingForm: FormGroup;
  public user: IUser;
  public basket: IBasket[] = [];
  public adress: IAdress;
  public adressForm: FormGroup

  constructor(private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private basketService: BasketService,
    private elem: ElementRef,
    private notifier: NotifierService,
    private fb: FormBuilder
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.getBaskets();
    this.generateForm();
    this.getUserAdress();
  }

  ngAfterViewInit(): void {
    window.addEventListener("load", () => {
      this.changeMehtod();
    })
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
  get f() {
    return this.adressForm.controls;
  }
  private changeMehtod(): void {
    let payment = this.elem.nativeElement.querySelectorAll(".payment ")
    payment.forEach(e => {
      e.addEventListener("click", (a) => {
        a.preventDefault();
        e.classList.toggle("active")
        if (e.nextSibling != null) {
          e.nextSibling.classList.remove("active")
        } else if (e.previousSibling != null) {
          e.previousSibling.classList.remove("active")
        }
      })
    })
  }
  public sale(): void {
    let totalPrice = 0
    this.basket.map(a => totalPrice += a.count * a.product.price);
    let saleItemm: any[] = [];

    for (let i = 0; i < this.basket.length; i++) {
      saleItemm.push({
        productId: this.basket[i].product.id,
        count: this.basket[i].count,
      })
    }
    let data = {
      totalSalePrice: totalPrice,
      saleItems: saleItemm
    }

    this.apiService.sale(data).subscribe(res => {
    }, err => {

    }, () => {
      this.addToOrderList();
      this.notifier.notify("success", "Sifarişiniz qəbul edildi")
      this.basketService.removeBasketAll();
      this.router.navigate([''])
    })
  }
  public addToOrderList(): void {
    let totalPrice = 0
    this.basket.map(a => totalPrice += a.count * a.product.price);
    let items: any[] = [];

    for (let i = 0; i < this.basket.length; i++) {
      items.push({
        productId: this.basket[i].product.id,
        count: this.basket[i].count,
      })
    }
    let data = {
      TotalSalePrice: totalPrice,
      items: items
    }

    this.apiService.addToOrderList(data).subscribe(res => {
    }, err => {

    }, () => {
    })
  }
  public getBaskets(): void {
    this.basket = this.basketService.getBaskets()
  }
  public getUserAdress(): void {
    this.apiService.getUserAdress().subscribe(res => {
      this.adress = res;
    })
  }
  public create(): void {
    this.submitted = true;
    if (this.adressForm.invalid) return;
    this.apiService.createUserAdress(this.adressForm.value).subscribe(res => {
    }, err => { },
      () => {
        this.getUserAdress();
        this.notifier.notify("success", "Ünvan əlavə edildi");
        this.adressForm.reset();
      })
  }

}
