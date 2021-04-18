import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: IProduct[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(): void {
    this.apiService.getProducts().subscribe(res => {
      this.products = res.products
      console.log(res);

    }, err => {

    }, () => {

    })
  }

}
