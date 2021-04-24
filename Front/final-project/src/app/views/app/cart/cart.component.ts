import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public basket: IBasket[] = [];
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.getBaskets();
  }
  public getBaskets(): void {
    this.basket = this.basketService.getBaskets();
    console.log(this.basket);
  }
  public removeBasketItem($event, id): void {
    $event.preventDefault();
    this.basketService.removeBasket(id);
    this.basketService.isChanged.next(true);
    this.getBaskets();
  }

}
