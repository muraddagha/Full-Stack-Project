import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product/product.model';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  public selectedSimpleItem = 'Varsaylan';
  page: number = 1;

  @Input() products: IProduct[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
