import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products-slider-container',
  templateUrl: './products-slider-container.component.html',
  styleUrls: ['./products-slider-container.component.scss']
})
export class ProductsSliderContainerComponent implements OnInit {
  @Input() title;
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
  constructor() { }

  ngOnInit(): void {
  }

}
