import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';
import { ProductListContainerComponent } from 'src/app/shared/containers/product-list-container/product-list-container.component';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  @ViewChild(ProductListContainerComponent) filter: ProductListContainerComponent
  public products: IProduct[] = [];
  public productsByDepartment: ViewChild
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    // console.log(this.filter);
  }
  private getProducts(): void {
    this.apiService.getNewArrivalsProduct(40, 0).subscribe(res => {
      this.products = res.products;
    })
  }





}
