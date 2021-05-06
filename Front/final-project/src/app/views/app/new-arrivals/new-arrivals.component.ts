import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  public products: IProduct[] = [];
  public productsByDepartment: ViewChild
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  private getProducts(): void {
    this.apiService.getNewArrivalsProduct(40, 0).subscribe(res => {
      this.products = res.products;
    })
  }





}
