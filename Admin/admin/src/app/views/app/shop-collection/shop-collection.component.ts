import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ICategory } from 'src/app/shared/models/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { IShopCollection } from 'src/app/shared/models/shop-collection.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-shop-collection',
  templateUrl: './shop-collection.component.html',
  styleUrls: ['./shop-collection.component.scss']
})
export class ShopCollectionComponent implements OnInit {

  public shopCollections: IShopCollection[] = [];
  public totalCount: number;
  page: number = 1;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public collectionId: any;
  public submitted = false;
  public products: IProduct[] = [];
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }


  ngOnInit(): void {
    this.getShopCollections();
    this.getProducts();
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
      productId: ["", [Validators.required]],
      orderBy: ["", [Validators.required, Validators.maxLength(50)]],
      subtitle: ["", [Validators.maxLength(100)]],
      title: ["", [Validators.required, Validators.maxLength(200)]],
      backgroundColor: ["", [Validators.required, Validators.maxLength(50)]],
      btnText: ["", [Validators.required, Validators.maxLength(50)]],
      btnUrl: ["", [Validators.required, Validators.maxLength(100)]],
    })
  }

  generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      productId: ["", [Validators.required]],
      orderBy: ["", [Validators.required, Validators.maxLength(50)]],
      subtitle: ["",],
      title: ["", [Validators.required, Validators.maxLength(200)]],
      backgroundColor: ["", [Validators.required, Validators.maxLength(50)]],
      btnText: ["", [Validators.required, Validators.maxLength(50)]],
      btnUrl: ["", [Validators.required, Validators.maxLength(100)]],
      softDeleted: ["",],
    })
  }

  public updateCategory(collection: IShopCollection) {
    this.collectionId = collection.id;
    this.updateForm.patchValue({
      productId: collection.product.id,
      orderBy: collection["orderBy"],
      subtitle: collection["subtitle"],
      title: collection["title"],
      backgroundColor: collection["backgroundColor"],
      btnText: collection["btnText"],
      btnUrl: collection["btnUrl"],
      softDeleted: collection["softDeleted"]
    })
  }
  public create(): void {
    this.submitted = true;
    console.log(this.f);
    if (this.createForm.invalid) return;
    this.apiService.createShopCollection(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Kolleksaiya yaradldı");
        this.createForm.reset();
        this.submitted = false;
        this.getShopCollections();
      })
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;

    this.apiService.updateShopCollection(this.collectionId, this.updateForm.value).subscribe(res => {
    },
      err => {
        console.log(err);

        ///..
      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Kolleksiya yeniləndi")
        this.getShopCollections();
        this.submitted = false;
        this.updateForm.reset();
      })
  }

  public getShopCollections(): void {
    this.apiService.getShopCollections().subscribe(res => {
      this.shopCollections = res.shopCollections;
      this.totalCount = res.shopCollections.length;
    })
  }
  public removeCollection($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeShopCollection(id).subscribe(res => {
        console.log(res);
      }, err => {

      }, () => {
        this.notifier.notify("error", "Şöbə deaktiv edildi")
        this.getShopCollections();
      })
    }
  }

  public getProducts(): void {
    this.apiService.getProducts().subscribe(res => {
      this.products = res.products;
    })
  }

}
