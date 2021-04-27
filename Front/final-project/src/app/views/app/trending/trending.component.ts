import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  public products: IProduct[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getTrendProducts(40, 0).subscribe(res => {
      this.products = res.products;
    })
  }

}
