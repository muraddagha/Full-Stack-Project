import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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

  constructor(private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private basketService: BasketService,
    private elem: ElementRef,
    private notifier: NotifierService,) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.getBaskets();
    this.changeMehtod();
  }

  private changeMehtod(): void {
    let payment = this.elem.nativeElement.querySelectorAll(".payment")

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
    // let ul = this.elem.nativeElement.querySelectorAll(".payment");
    // ul.forEach(a => {
    //   a.classList.remove("active")
    // })
    // element.classList.toggle("active")
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

}
