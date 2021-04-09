import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-new-arrivals-container',
  templateUrl: './new-arrivals-container.component.html',
  styleUrls: ['./new-arrivals-container.component.scss']

})
export class NewArrivalsContainerComponent implements OnInit {
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


  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
}
