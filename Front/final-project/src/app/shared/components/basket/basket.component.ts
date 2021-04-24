import { Component, OnInit } from '@angular/core';
import { IBasket } from '../../models/basket.model';
import { IProduct } from '../../models/product/product.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public basket: IBasket[] = [];
  isAdded: boolean;
  constructor(private basketService: BasketService) {
    if (localStorage.getItem('basket') != null) {
      this.getBaskets();
    }
    this.getBasketOnChange();
  }

  ngOnInit(): void {
  }

  public getBaskets(): void {
    this.basket = this.basketService.getBaskets();
  }
  public getBasketOnChange() {
    this.basketService.isChanged.subscribe(() => {
      this.basket = this.basketService.getBaskets();
    })
  }

  public removeBasket(id: number, $event): void {
    $event.preventDefault();
    this.basketService.removeBasket(id);
  }
  public increase($event, product: IProduct): void {
    $event.preventDefault();
    this.basketService.increase(product)
    this.basketService.isChanged.next(true);
    this.getBaskets();
  }

  public decrease($event, product: IProduct): void {
    $event.preventDefault();
    this.basketService.decrease(product)
    this.basketService.isChanged.next(true);
    this.getBaskets();
  }

}
