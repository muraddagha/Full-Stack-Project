import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasket } from '../models/basket.model';
import { IProduct } from '../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basket: IBasket[] = [];
  public isChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public getBaskets(): any {
    if (localStorage.getItem('basket') != null) {
      this.basket = JSON.parse(localStorage.getItem('basket')) as IBasket[];
      return this.basket;
    }
  }

  public addToBasket(product: IProduct): void {
    let productVar: IProduct[] = this.basket.map(a => a.product)
    let prdouctIsExsist = productVar.find(({ id }) => id == product.id)

    if (!prdouctIsExsist) {
      this.basket.push({ count: 1, product: product });
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.isChanged.next(true);
    }

    if (prdouctIsExsist) {
      let basket = this.basket.filter(value => value.product.id == prdouctIsExsist.id)
      basket.map(a => a.count++);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.isChanged.next(true);
    }

  }
  public removeBasket(id: number): void {
    if (confirm("Əminsinizmi?")) {
      this.basket = this.basket.filter(a => a.product.id != id)
      localStorage.setItem('basket', JSON.stringify(this.basket));
      if (this.basket.length == 0) {
        localStorage.removeItem('basket');
      }
      this.isChanged.next(true);
    }

  }

  public increase(product: IProduct): void {
    let basket = this.basket.filter(value => value.product.id == product.id)

    basket.map(a => a.count++);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.isChanged.next(true);

  }

  public decrease(product: IProduct): void {
    let basket = this.basket.filter(value => value.product.id == product.id)

    basket.map(a => a.count--);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.isChanged.next(true);

  }
}
