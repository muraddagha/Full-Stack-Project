import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IShopCollection } from 'src/app/shared/models/shop-collection.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isCollapsed = false;
  public collections: IShopCollection[] = [];
  options: OwlOptions = {
    loop: true,
    items: 5,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1700,
    dots: false,
    responsive: {
      0: {
        items: 2,
        loop: true
      },
      600: {
        items: 4
      },
      800: {
        items: 5
      }
    },
    nav: false,
  };

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getShopCollections();
  }

  getShopCollections(): void {
    this.apiService.getShopCollections(3).subscribe(res => {
      this.collections = res.shopCollections;
    }, err => { },
      () => { })
  }



}
