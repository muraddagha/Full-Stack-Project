import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product/product.model';
import { IWishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public wishlist: IWishlist[] = [];
  public isChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private notifier: NotifierService) { }

  public getWishlist(): any {
    if (localStorage.getItem("wishlist") != null) {
      this.wishlist = JSON.parse(localStorage.getItem('wishlist')) as IWishlist[];
      return this.wishlist;
    }
  }

  public addToWishlist(product: IProduct): void {
    let productVar: IProduct[] = this.wishlist.map(a => a.product);
    let prdouctIsExsist = productVar.find(({ id }) => id == product.id)

    if (!prdouctIsExsist) {
      this.wishlist.push({ product: product });
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      this.isChanged.next(true);
      this.notifier.notify("success", "Sevimlilərə əlavə olundu")
    }
    if (prdouctIsExsist) return;
  }
}
