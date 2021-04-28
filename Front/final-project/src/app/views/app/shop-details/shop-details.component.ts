import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { IUser } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  public product: IProduct;
  public products: IProduct[] = [];
  public basket: IBasket[] = [];
  public reviewForm: FormGroup;
  public submitted: Boolean = false;
  private id = this.activeRoute.snapshot.paramMap.get('id');
  public user: IUser;
  constructor(private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private elem: ElementRef,
    private basketService: BasketService,
    private fb: FormBuilder,
    private authService: AuthService,
    private notifier: NotifierService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.getProduct();
    this.getProductsByCategoryId();
    this.generateForm();
  }

  get f() {
    return this.reviewForm.controls;
  }

  generateForm() {
    this.reviewForm = this.fb.group({
      star: [""],
      review: ["", [Validators.required]]
    })
  }

  public create(): void {
    this.submitted = true;
    if (this.reviewForm.invalid) return;
    this.apiService.postReview(this.reviewForm.value, this.id).subscribe(res => {
    },
      err => { },
      () => {
        this.reviewForm.reset();
        this.submitted = false;
        this.notifier.notify("success", "Şərhiniz əlavə olundu");
        this.getProduct();
      })

  }
  public getProduct(): void {
    this.apiService.getProductById(this.id).subscribe(res => {
      this.product = res;
    })

  }
  public getProductsByCategoryId(): void {
    this.apiService.getProductById(this.id).subscribe(res => {
      this.apiService.getProductsByCategoryId(res.category.id, 4, 0).subscribe(products => {
        this.products = products.products
      })
    })
  }
  public changeColor(element): void {
    let ul = this.elem.nativeElement.querySelectorAll(".memory-li");
    ul.forEach(a => {
      a.classList.remove("active")
    })
    element.classList.toggle("active")
  }
  public starCount(count: number) {
    let star: number[] = [];
    for (var i = 1; i <= count; i++) {
      star.push(i)
    }
    return star;
  }
  public unratedStarCount(count: number) {
    let star: number[] = [];
    for (var i = 1; i <= 5 - count; i++) {
      star.push(i)
    }
    return star;
  }

  public addToCart(product: IProduct): void {
    this.basketService.addToBasket(product);
  }

}
