import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalProductPrice'
})
export class TotalProductPricePipe implements PipeTransform {

  transform(value: number, price: number, ...args: any): any {

    let totalProductPrice = value * price
    return totalProductPrice;
  }

}
