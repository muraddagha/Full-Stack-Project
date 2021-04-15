import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/category.model';
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
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.currentAdmin.subscribe(res => {
      this.adminName = res.fullname;
    })
  }

  ngOnInit(): void {
    this.getCategories();
    this.generateForm();
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
      // starCount: ["", Validators.required],
      inStock: ["true", Validators.required],
      isFeatured: ["false"],
      isTrend: ["false"],
      isTopSell: ["false"],
      isHotDeal: ["false"],
      photos: ["", [Validators.required]],
      addedBy: [this.adminName, [Validators.required, Validators.maxLength(50)]]
    })
  }

  public create(): void {

  }

  private getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res.categories;
    })
  }

}
