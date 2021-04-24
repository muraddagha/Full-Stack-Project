import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { IProduct } from '../../models/product/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  public products: IProduct[] = [];
  public founded: IProduct[] = [];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPrdocuts();
  }

  public search($event): void {
    let input = $event.target.value.toLowerCase();
    let foundedProducts = this.products.filter(({ name }) => name.toLowerCase().includes(input))
    this.founded = foundedProducts;
    if (input.length == 0) {
      this.founded = []
    }
    this.routeOnChange($event)
  }

  private routeOnChange($event): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $event.target.value = ""
        this.founded = []
      }
    });
  }

  public getAllPrdocuts(): void {
    this.apiService.getAllProducts().subscribe(res => {
      this.products = res.products;
    })
  }

}
