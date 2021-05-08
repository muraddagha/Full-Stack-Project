import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { IProduct } from '../../models/product/product.model';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  @ViewChild(FilterComponent) filter: FilterComponent
  public filtered: boolean = false;

  public selectedSimpleItem = 'Varsaylan';
  page: number = 1;

  @Input() products: IProduct[] = [];
  public outputProducts: IProduct[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.filter.otP.subscribe(res => {
      this.outputProducts = res
      if (this.outputProducts.length > 0) {
        this.filtered = true
      }

    });
  }

}
