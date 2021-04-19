import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IBrand } from 'src/app/shared/models/brand/brand.model';
import { ICategory } from 'src/app/shared/models/category.model';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public createForm: FormGroup
  public submitted: boolean = false;
  public adminName: string;
  public categories: ICategory[] = [];
  public brands: IBrand[] = [];
  public uploadImg: IUploadImage[] = [];
  public order = 0;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router) {
    this.authService.currentAdmin.subscribe(res => {
      this.adminName = res.fullname;
    })
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
    this.generateForm();
    this.photoss.removeAt(0)
  }
  get f() {
    return this.createForm.controls;
  }

  generateForm() {
    this.createForm = this.formBuilder.group({
      categoryId: ["", [Validators.required]],
      brandId: [""],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      price: ["", [Validators.required]],
      sku: ["", [Validators.required, Validators.maxLength(100)]],
      inStock: ["true", Validators.required],
      isFeatured: ["false"],
      isTrend: ["false"],
      isTopSell: ["false"],
      isHotDeal: ["false"],
      // photos: new FormArray([new FormGroup({
      //   img: new FormControl(''),
      //   orderBy: new FormControl('')
      // })]),
      options: new FormArray([new FormGroup({
        title: new FormControl(''),
        type: new FormControl(''),
        productOptionItems: new FormArray([new FormGroup({
          name: new FormControl(''),
          value: new FormControl('')
        })]),
      })]),
      addedBy: [this.adminName, [Validators.required, Validators.maxLength(50)]]
    })
  }

  get photoss() {
    return this.createForm.get('photos') as FormArray
  }

  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return
    this.apiService.createProduct(this.createForm.value).subscribe(res => {

    }, err => {

    }, () => {
      this.notifier.notify("success", "Məhsul yaradldı");
      this.createForm.reset();
      this.router.navigate(["/app/product"])
    })
  }

  public upload($event): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0])
      this.uploadPhoto(formData)
      this.order++;
    }
  }

  private addPhoto(img, order): FormGroup {
    return this.formBuilder.group({
      img: img,
      orderBy: order,
    })
  }

  public removePhoto($event, name: string, i): void {
    $event.preventDefault();
    this.apiService.removeUploadPhoto(name).subscribe(res => {
    }, err => {

    }, () => {
      this.uploadImg = this.uploadImg.filter(a => a.fileName != name);
      this.photoss.removeAt(i)
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
  private uploadPhoto(data: any): void {
    this.apiService.uploadPhoto(data).subscribe(res => {
      this.uploadImg.push(res);
      this.photoss.push(this.addPhoto(res.src, this.order))
    },
      error => {
      })
  }

}
