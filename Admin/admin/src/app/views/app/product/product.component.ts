import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Event, NavigationStart, ActivationEnd, ActivationStart } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IOption } from 'src/app/shared/models/product/product-option.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public totalCount: number;
  page: number = 1;
  public products: IProduct[] = [];
  public optionForm: FormGroup;
  public productOptions: IOption[] = []
  public submitted: boolean = false

  constructor(private apiService: ApiService,
    private router: Router,
    private notifier: NotifierService,
    private formBuilder: FormBuilder) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationStart) {

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.getproducts();
      }
    });
  }

  ngOnInit(): void {
    this.getproducts();
    this.generateUpdateForm();
    this.options.removeAt(0)
  }

  generateUpdateForm() {
    this.optionForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(50)]],
      type: ["", [Validators.required]],
      productOptionItems: new FormArray([new FormGroup({
        name: new FormControl(''),
        value: new FormControl('')
      })]),
      // modifiedBy: [this.adminName, [Validators.required, Validators.maxLength(50)]]
    })
  }
  get f() {
    return this.optionForm.controls;
  }
  private addOptionItem(name, value): FormGroup {
    return this.formBuilder.group({
      name: name,
      value: value,
    })
  }

  get options() {
    return this.optionForm.get('productOptionItems') as FormArray
  }

  getproducts(): void {
    this.apiService.getProducts().subscribe(res => {
      this.products = res.products;
      this.totalCount = res.products.length;
    }, err => {

    }, () => {

    })
  }
  removeProduct($event, id): void {
    $event.preventDefault();
    this.apiService.removeProduct(id).subscribe(res => {

    },
      err => {

      },
      () => {
        this.notifier.notify("success", "Məhsul silindi")
        this.getproducts();
      })
  }
  option($event, product: IProduct) {
    $event.preventDefault();
    this.productOptions = product.options
    this.optionForm.patchValue({
      title: product.options.map(a => a.title),
      type: product.options.map(a => a.type),
    })
    // let name = product.options.map(a => a.productOptionItems.map(a => a.name));
    // let value = product.options.map(a => a.productOptionItems.map(a => a.value));
    // this.options.push(this.addOptionItem(name, value))
  }
  optionUpdate(): void {
  }

}
