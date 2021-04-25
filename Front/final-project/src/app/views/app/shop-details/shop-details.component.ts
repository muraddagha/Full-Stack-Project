import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  public product: IProduct;
  constructor(private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private elem: ElementRef
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.apiService.getProductById(id).subscribe(res => {
      this.product = res;
    })
  }

  public changeColor(element: Renderer2): void {

  }

}
