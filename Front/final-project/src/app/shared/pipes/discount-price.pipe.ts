import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {

  transform(value: any, precentage: any,): any {
    var price = value - (value * precentage / 100)
    return price.toFixed();
  }

}
