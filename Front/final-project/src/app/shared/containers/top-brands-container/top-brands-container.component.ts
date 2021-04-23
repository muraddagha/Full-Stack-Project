import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IBrand } from '../../models/brand.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-top-brands-container',
  templateUrl: './top-brands-container.component.html',
  styleUrls: ['./top-brands-container.component.scss']
})
export class TopBrandsContainerComponent implements OnInit {
  options: OwlOptions = {
    loop: true,
    items: 5,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1700,
    dots: false,
    responsive: {
      0: {
        items: 1,
        loop: true
      },
      500: {
        items: 3,
      },
      800: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
  };
  public brands: IBrand[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  private getBrands(): void {
    this.apiService.getBrands(6).subscribe(res => {
      this.brands = res.brands;
    })
  }

}
