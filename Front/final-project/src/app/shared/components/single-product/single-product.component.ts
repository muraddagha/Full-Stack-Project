import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../models/product/product.model';
import { BasketService } from '../../services/basket.service';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  star = faStar;
  @Input() product: IProduct;

  constructor(private basketService: BasketService,
    private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

  public starCount(count: number) {
    let star: number[] = [];
    for (var i = 1; i <= count; i++) {
      star.push(i)
    }
    return star;
  }
  public unratedStarCount(count: number) {
    let star: number[] = [];
    for (var i = 1; i <= 5 - count; i++) {
      star.push(i)
    }
    return star;
  }

  public addToBasket($event, product: IProduct): void {
    $event.preventDefault();
    this.basketService.addToBasket(product)
  }

  public addToWishlist($event, product: IProduct): void {
    $event.preventDefault();
    this.wishlistService.addToWishlist(product);
  }

}
