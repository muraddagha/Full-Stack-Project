import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../models/product/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products-slider-container',
  templateUrl: './products-slider-container.component.html',
  styleUrls: ['./products-slider-container.component.scss']
})
export class ProductsSliderContainerComponent implements OnInit {
  @Input() title;
  @Input() featured: boolean = false;
  @Input() topSell: boolean = false;
  public featuredProducts: IProduct[] = [];
  public topSellProducts: IProduct[] = [];
  options: OwlOptions = {
    loop: true,
    items: 4,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1700,
    dots: false,
    nav: true,
    navText: ["<i class='ti ti-angle-left'></i>", "<i class='ti ti-angle-right'></i>"],
    responsive: {
      0: {
        items: 1,
        loop: true
      },
      500: {
        items: 2,
        nav: false,
      },
      800: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
  };
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.getTopSellingProducts();
  }

  public getFeaturedProducts(): void {
    this.apiService.getFeaturedProducts(10, 1).subscribe(res => {
      this.featuredProducts = res.products
    })
  }

  public getTopSellingProducts(): void {
    this.apiService.getTopSellingProducts(10, 1).subscribe(res => {
      this.topSellProducts = res.products
    })
  }



}
