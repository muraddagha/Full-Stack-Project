import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IBrand } from 'src/app/shared/models/brand/brand.model';
import { ICategory } from 'src/app/shared/models/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  public product: IProduct;
  public updateForm: FormGroup
  public submitted: boolean = false;
  public adminName: string;
  public categories: ICategory[] = [];
  public brands: IBrand[] = [];
  public uploadImg: IUploadImage[] = [];
  public order: any = 1;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private notifier: NotifierService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
    this.getBrands();
    this.generateForm();
  }
  get f() {
    return this.updateForm.controls;
  }

  generateForm() {
    this.updateForm = this.formBuilder.group({
      categoryId: ["", [Validators.required]],
      brandId: [""],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      price: ["", [Validators.required]],
      sku: ["", [Validators.required, Validators.maxLength(100)]],
      inStock: ["true", Validators.required],
      isFeatured: [""],
      isTrend: [""],
      isTopSell: [""],
      isHotDeal: [""],
      softDeleted: [""],
    })
  }

  public update(): void {
    this.submitted = true;
    console.log(this.updateForm.value);

    if (this.updateForm.invalid) return
    this.apiService.updateProduct(this.product.id, this.updateForm.value).subscribe(res => {

    }, err => {

    }, () => {
      this.notifier.notify("success", "Məhsul yeniləndi");
      this.router.navigate(["/app/product"])
    })
  }
  public upload($event): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0]);
      this.apiService.uploadPhoto(formData, this.product.id, this.product.photos.length + 1).subscribe(res => {
      },
        error => {
        }, () => {
          this.getProduct();
        })
    }
  }
  public removePhoto($event, name: string, id, i): void {
    $event.preventDefault();
    this.apiService.removeUploadPhoto(name, id).subscribe(res => {
    }, err => {

    }, () => {
      this.getProduct();
    })
  }

  private getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res.categories;
    })
  }
  private getBrands(): void {
    this.apiService.getBrands().subscribe(res => {
      this.brands = res.brands;
    })
  }
  private getProduct(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.apiService.getProductById(id).subscribe(res => {
      this.product = res;
      this.updateForm.patchValue({
        categoryId: res.category.id,
        brandId: res.brand.id,
        name: this.product["name"],
        description: res["description"],
        price: res["price"],
        sku: res["sku"],
        inStock: res["inStock"],
        isFeatured: res["isFeatured"],
        isTrend: res["isTrend"],
        isTopSell: res["isTopSell"],
        isHotDeal: res["isHotDeal"],
        softDeleted: res["softDeleted"]
      })
    })
  }
}
