import { Component, ElementRef, OnInit } from '@angular/core';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from 'src/app/shared/models/admin/admin.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';


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
  public uploadImg: IUploadImage[] = [];
  public department: IDepartment;
  private departmentId: any;
  constructor(private apiService: ApiService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private element: ElementRef) {
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
      logo: ["", [Validators.maxLength(200)]],
      fileName: ["", [Validators.maxLength(200)]],
      isPopular: [""]
    })
  }
  private generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      icon: ["", [Validators.maxLength(150)]],
      logo: ["", [Validators.maxLength(200)]],
      fileName: ["", [Validators.maxLength(200)]],
      isPopular: [""],
      softDeleted: [""],
    })
  }
  public updateDepartment(department: IDepartment) {
    this.departmentId = department.id;
    this.department = department;

    this.updateForm.patchValue({
      name: department['name'],
      icon: department['icon'],
      logo: department["logo"],
      fileName: department["fileName"],
      isPopular: department["isPopular"],
      softDeleted: department['softDeleted']
    })
  }
  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createDepartment(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.submitted = false;
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Şöbə yaradldı");
        this.createForm.reset();
        this.getDepartments();
      })
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;

    this.apiService.updateDepartment(this.departmentId, this.updateForm.value).subscribe(res => {

    },
      err => {
      },
      () => {
        this.submitted = false;
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

  private uploadPhoto(data: any): void {
    this.apiService.uploadPhoto(data).subscribe(res => {
      this.uploadImg.push(res);
      if (this.department != undefined) {
        this.department.logo = res.src;
        this.department.fileName = res.fileName;
      }
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
  public removePhoto($event, name: string, i): void {
    $event.preventDefault();
    this.apiService.removeUploadPhoto(name).subscribe(res => {
    }, err => {

    }, () => {
      this.uploadImg = this.uploadImg.filter(a => a.fileName != name);
      this.createForm.patchValue({
        logo: '',
        fileName: ''
      })
      this.updateForm.patchValue({
        logo: null,
        fileName: null,
      })
      if (this.department != undefined) {
        this.department.logo = null;
        this.department.fileName = null;
      }
    })
  }
  public upload($event): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0])
      this.uploadPhoto(formData)
      $event.target.value = ""
    }
  }
  public removeLogo($event, department: IDepartment) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeDepartmentLogo(department.fileName, department.id,).subscribe(res => {
      }, err => {

      }, () => {
        this.getDepartments();
        this.updateForm.patchValue({
          logo: null,
          fileName: null
        })
        this.department.logo = null;
        this.department.fileName = null;
      })
    }
  }

}
