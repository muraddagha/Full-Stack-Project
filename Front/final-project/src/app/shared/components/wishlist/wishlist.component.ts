import { Component, OnInit } from '@angular/core';
import { IWishlist } from '../../models/wishlist.model';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public wishlist: IWishlist[] = [];
  constructor(private wishlistService: WishlistService) {
    if (localStorage.getItem('wishlist') != null) {
      this.getwishlist();
    }
    this.getWishlistOnChange();
  }

  ngOnInit(): void {
    this.getwishlist();
  }

  getwishlist(): void {
    this.wishlist = this.wishlistService.getWishlist()
  }
  public getWishlistOnChange() {
    this.wishlistService.isChanged.subscribe(() => {
      this.wishlist = this.wishlistService.getWishlist();
    })
  }

}
