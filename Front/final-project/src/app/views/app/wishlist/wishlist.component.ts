import { Component, OnInit } from '@angular/core';
import { IWishlist } from 'src/app/shared/models/wishlist.model';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public wishlist: IWishlist[] = [];
  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  private getWishlist(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  public removeWishlistItem($event, id: any): void {
    $event.preventDefault();
    this.wishlistService.removeWishlistItem(id);
    this.getWishlist();
  }

}
