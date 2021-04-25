import { Pipe, PipeTransform } from '@angular/core';
import { IBasket } from '../models/basket.model';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(value: IBasket[], ...args: any): any {

    var totalPrice = 0;

    value.forEach(a => {
      totalPrice += a.count * a.product.price;
    })
    return totalPrice;

  }

}
