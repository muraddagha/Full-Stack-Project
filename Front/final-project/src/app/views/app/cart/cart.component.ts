import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public basket: IBasket[] = [];
  public user: IUser;
  constructor(private basketService: BasketService,
    private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.getBaskets();
  }
  public getBaskets(): void {
    this.basket = this.basketService.getBaskets();
  }
  public removeBasketItem($event, id): void {
    $event.preventDefault();
    this.basketService.removeBasket(id);
    this.basketService.isChanged.next(true);
    this.getBaskets();
  }
  public increase($event, product: IProduct): void {
    $event.preventDefault();
    this.basketService.increase(product)
    this.getBaskets();
  }

  public decrease($event, product: IProduct): void {
    $event.preventDefault();
    this.basketService.decrease(product)
    this.getBaskets();
  }

}
