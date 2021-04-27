import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../models/product/product.model';
import { ApiService } from '../../services/api.service';

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
  public phones: IProduct[] = [];
  public laptops: IProduct[] = [];
  public tvs: IProduct[] = [];


  constructor(private elementRef: ElementRef,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPhones();
    this.getLaptops();
    this.getTvs();
  }

  public getPhones(): void {
    this.apiService.getNewArrivalsProductsByDepartmentId(10, 1).subscribe(res => {
      this.phones = res.products;
    }, err => {

    },
      () => {

      })
  }

  public getLaptops(): void {
    this.apiService.getNewArrivalsProductsByDepartmentId(10, 4).subscribe(res => {
      this.laptops = res.products;
    }, err => {

    },
      () => {

      })
  }

  public getTvs(): void {
    this.apiService.getNewArrivalsProductsByDepartmentId(10, 2).subscribe(res => {
      this.tvs = res.products;
    }, err => {

    },
      () => {

      })
  }
}
