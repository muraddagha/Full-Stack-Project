import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event, NavigationStart, ActivationEnd, ActivationStart } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public products: IProduct[] = [];
  constructor(private apiService: ApiService,
    private acitveRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationStart) {

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.getProductsByCategoryId();
        window.scroll(75, 75);
      }
    });
  }

  ngOnInit(): void {
    this.getProductsByCategoryId();
  }

  private getProductsByCategoryId(): void {
    let id = this.acitveRoute.snapshot.paramMap.get("id");
    this.apiService.getProductsByCategoryId(id, 10, 0).subscribe(res => {
      this.products = res.products;
    })
  }


}
