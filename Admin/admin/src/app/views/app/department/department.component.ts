import { Component, ElementRef, OnInit } from '@angular/core';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from 'src/app/shared/models/admin/admin.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public totalCount: number;
  page: number = 1;
  public submitted: boolean = false;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public departments: IDepartment[] = [];
  public admin: IAdmin;
  private departmentId: any;
  constructor(private apiService: ApiService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private element: ElementRef) {
    this.authService.currentAdmin.subscribe(admin => {
      this.admin = admin;
    })
    this.getDepartments();
  }

  ngOnInit(): void {
    this.generateCreateForm();
    this.generateUpdateForm();
  }
  get f() {
    return this.createForm.controls;
  }
  get u() {
    return this.updateForm.controls;

  }

  private generateCreateForm() {
    this.createForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      icon: ["", [Validators.maxLength(150)]],
      addedBy: [this.admin.fullname, [Validators.required, Validators.maxLength(50)]]
    })
  }
  private generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      icon: ["", [Validators.maxLength(150)]],
      softDeleted: [""],
      modifiedBy: [this.admin.fullname, [Validators.required, Validators.maxLength(50)]]
    })
  }
  public updateDepartment($event, department: IDepartment) {
    this.departmentId = department.id;
    console.log(department.name);

    this.updateForm.patchValue({
      name: department['name'],
      icon: department['icon'],
      softDeleted: department['softDeleted']
    })
  }

  public create(): void {
    this.submitted = true;
    console.log(this.f);
    if (this.createForm.invalid) return;
    this.apiService.createDepartment(this.createForm.value).subscribe(res => {
      console.log(res);
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Şöbə yaradldı");
        this.createForm.reset();
        this.getDepartments();
      })
  }
  public update(): void {

    this.submitted = true;
    console.log(this.updateForm.value);

    if (this.updateForm.invalid) return;

    this.apiService.updateDepartment(this.departmentId, this.updateForm.value).subscribe(res => {

    },
      err => {
        console.log(err);

        ///..
      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Şöbə yeniləndi")
        this.updateForm.reset();
        this.getDepartments();
      })
  }
  private getDepartments(): void {
    this.apiService.getDepartments().subscribe(res => {
      this.departments = res.departments;
      this.totalCount = res.departments.length
    }),
      err => {
        switch (err.status) {
          case 400:

            break;
          case 404:
            this.notifier.notify("error", err.error.message)
            break;
          case 409:
            this.notifier.notify("error", err.error.message)
            break;
          default:
            break;
        }

      },
      () => {

      }
  }
  public removeDepartment($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeDepartment(id).subscribe(res => {
        console.log(res);
      }, err => {

      }, () => {
        this.notifier.notify("error", "Şöbə deaktiv edildi")
        this.getDepartments();
      })
    }
  }

}
