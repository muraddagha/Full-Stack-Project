import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IBrand } from 'src/app/shared/models/brand/brand.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  public brands: IBrand[] = [];
  public brand: IBrand;
  public uploadImg: IUploadImage[] = [];
  public totalCount: number;
  page: number = 1;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public brandId: any;
  public submitted = false;
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }


  ngOnInit(): void {
    this.getBrands();
    this.generateCreateForm();
    this.generateUpdateForm();
  }

  get f() {
    return this.createForm.controls;
  }
  get u() {
    return this.updateForm.controls;
  }
  generateCreateForm() {
    this.createForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      logo: ["", [Validators.required, Validators.maxLength(100)]],
      fileName: ["", [Validators.maxLength(200)]],
    })
  }

  generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      softDeleted: ["",],
      logo: ["", [Validators.required, Validators.maxLength(100)]],
      fileName: ["", [Validators.maxLength(200)]],
    })
  }
  public updateBrand(brand: IBrand) {
    this.brandId = brand.id;
    this.brand = brand;
    this.updateForm.patchValue({
      name: brand["name"],
      softDeleted: brand["softDeleted"],
      logo: brand["logo"],
      fileName: brand["fileName"]
    })
  }
  public create(): void {
    this.submitted = true;
    console.log(this.createForm.value);
    if (this.createForm.invalid) return;
    this.apiService.createBrand(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Brend yaradldı");
        this.createForm.reset();
        this.submitted = false;
        this.getBrands();
      })
  }
  public update(): void {
    this.submitted = true;
    console.log(this.updateForm.value);

    if (this.updateForm.invalid) return;

    this.apiService.updateBrand(this.brandId, this.updateForm.value).subscribe(res => {
    },
      err => {
        console.log(err);

        ///..
      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Brend yeniləndi")
        this.getBrands();
        this.submitted = false;
        this.updateForm.reset();
      })
  }
  public removePhoto($event, name: string, i): void {
    $event.preventDefault();
    this.apiService.removeUploadPhoto(name).subscribe(res => {
    }, err => {

    }, () => {
      this.uploadImg = this.uploadImg.filter(a => a.fileName != name);
      this.createForm.patchValue({
        logo: ''
      })
    })
  }
  public upload($event): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0])
      this.uploadPhoto(formData)
    }
  }
  public getBrands(): void {
    this.apiService.getBrands().subscribe(res => {
      this.brands = res.brands;
      this.totalCount = res.brands.length;
    })
  }
  public removeBrand($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeBrand(id).subscribe(res => {
        console.log(res);
      }, err => {

      }, () => {
        this.notifier.notify("error", "Brend deaktiv edildi")
        this.getBrands();

      })
    }
  }
  private uploadPhoto(data: any): void {
    this.apiService.uploadPhoto(data).subscribe(res => {
      this.uploadImg.push(res);
      this.createForm.patchValue({
        logo: res["src"],
        fileName: res["fileName"]
      })
      this.updateForm.patchValue({
        logo: res["src"],
        fileName: res["fileName"]
      })
    },
      error => {
      }, () => { })
  }
  public removeBrandLogo($event, brand: IBrand) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeBrandLogo(brand.fileName, brand.id,).subscribe(res => {
      }, err => {

      }, () => {
        this.getBrands();
        this.brand.logo = "";
        this.brand.fileName = "";
        console.log(brand.logo.length);
      })
    }
  }

}
