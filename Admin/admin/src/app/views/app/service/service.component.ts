import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IService } from 'src/app/shared/models/service.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public services: IService[] = [];
  public service: IService;
  public page: number = 1;
  public submitted = false;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }

  ngOnInit(): void {
    this.getServices();
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
      title: ["", [Validators.required, Validators.maxLength(100)]],
      subtitle: ["", [Validators.required, Validators.maxLength(100)]],
      icon: ["", [Validators.required, Validators.maxLength(200)]],
      orderBy: ["", [Validators.required]],
    })
  }
  generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      subtitle: ["", [Validators.required, Validators.maxLength(100)]],
      icon: ["", [Validators.required, Validators.maxLength(200)]],
      orderBy: ["", [Validators.required]],
      softDeleted: [""],
    })
  }

  private getServices(): void {
    this.apiService.getServices().subscribe(res => {
      this.services = res.services;
    })
  }

  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createService(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Servis yaradldı");
        this.createForm.reset();
        this.submitted = false;
        this.getServices();
      })

  }
  public updateService(service: IService) {
    this.service = service;
    this.updateForm.patchValue({
      title: service["title"],
      subtitle: service["subtitle"],
      icon: service["icon"],
      orderBy: service["orderBy"],
      softDeleted: service["softDeleted"]
    })
  }
  public removeService($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeService(id).subscribe(res => {
      }, err => {

      }, () => {
        this.notifier.notify("error", "Servis deaktiv edildi")
        this.getServices();

      })
    }
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;
    this.apiService.updateService(this.service.id, this.updateForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Servis yeniləndi");
        this.updateForm.reset();
        this.submitted = false;
        this.getServices();
      })

  }

}
