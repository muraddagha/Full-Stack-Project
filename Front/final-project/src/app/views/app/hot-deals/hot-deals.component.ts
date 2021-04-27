import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss']
})
export class HotDealsComponent implements OnInit {

  public products: IProduct[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getHotDealProducts(40, 0).subscribe(res => {
      this.products = res.products;
    })
  }

}
