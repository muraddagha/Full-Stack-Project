import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isCollapsed = false;

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

  constructor() { }

  ngOnInit(): void {
  }


}
