import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IAdmin } from 'src/app/shared/models/admin/admin.model';
import { ICategory } from 'src/app/shared/models/category.model';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: ICategory[] = [];
  public totalCount: number;
  page: number = 1;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public categoryId: any;
  public submitted = false;
  public departments: IDepartment[] = [];
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }


  ngOnInit(): void {
    this.getCategories();
    this.getDepartments();
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
      departmentId: ["", [Validators.required]],
    })
  }

  generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      departmentId: ["", [Validators.required]],
      softDeleted: [""],
    })
  }

  public updateCategory($event, category: ICategory) {
    this.categoryId = category.id;
    this.updateForm.patchValue({
      name: category['name'],
      departmentId: category["departmentId"],
      softDeleted: category["softDeleted"]
    })
  }
  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createCategory(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Kateqoriya yaradldı");
        this.createForm.reset();
        this.getCategories();
      })
  }
  public update(): void {
    this.submitted = true;

    if (this.updateForm.invalid) return;

    this.apiService.updateCategory(this.categoryId, this.updateForm.value).subscribe(res => {

    },
      err => {
        console.log(err);

        ///..
      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Kateqoriya yeniləndi")
        this.updateForm.reset();
        this.getCategories();
      })
  }

  public getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res.categories;
      this.totalCount = res.count;
    })
  }
  public removeCategory($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeCategory(id).subscribe(res => {
      }, err => {

      }, () => {
        this.notifier.notify("error", "Şöbə deaktiv edildi")
        this.getCategories();
      })
    }
  }
  public getDepartments(): void {
    this.apiService.getDepartments().subscribe(res => {
      this.departments = res.departments;
    })
  }

}
