import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IBanner } from 'src/app/shared/models/banner.model';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public banners: IBanner[] = [];
  public page = 1;
  public submitted: boolean = false;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public uploadImg: IUploadImage[] = [];
  public banner: any;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }

  ngOnInit(): void {
    this.getBanners();
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
      title: ["", [Validators.required, Validators.maxLength(200)]],
      subtitle: ["", [Validators.required, Validators.maxLength(200)]],
      text: ["", [Validators.maxLength(200)]],
      image: ["", [Validators.required, Validators.maxLength(100)]],
      fileName: ["", [Validators.required, Validators.maxLength(200)]],
      isBigBanner: ["false"],
      isMediumBanner: ["false"],
      isSmallBanner: ["false"],
    })
  }
  generateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(200)]],
      subtitle: ["", [Validators.required, Validators.maxLength(200)]],
      text: ["", [Validators.required, Validators.maxLength(200)]],
      image: ["", [Validators.required, Validators.maxLength(100)]],
      fileName: ["", [Validators.required, Validators.maxLength(200)]],
      isBigBanner: ["false"],
      isMediumBanner: ["false"],
      isSmallBanner: ["false"],
      softDeleted: [""],
    })
  }
  private getBanners(): void {
    this.apiService.getBanners().subscribe(res => {
      this.banners = res.banners;
    })
  }
  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createBanner(this.createForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Banner yaradldı");
        this.uploadImg = [];
        this.createForm.reset();
        this.generateCreateForm();
        this.submitted = false;
        this.getBanners();
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
  private uploadPhoto(data: any): void {
    this.apiService.uploadPhoto(data).subscribe(res => {
      this.uploadImg.push(res);
      if (this.banner != undefined) {
        this.banner.image = res.src;
        this.banner.fileName = res.fileName;
      }
      this.createForm.patchValue({
        image: res["src"],
        fileName: res["fileName"]
      })
      this.updateForm.patchValue({
        image: res["src"],
        fileName: res["fileName"]
      })
    },
      error => {
      }, () => { })
  }
  public removePhoto($event, name: string, id?: number): void {
    $event.preventDefault();
    if (id == null) {
      this.apiService.removeUploadPhoto(name).subscribe(res => {
      }, err => {

      }, () => {
        this.uploadImg = this.uploadImg.filter(a => a.fileName != name);
        this.createForm.patchValue({
          logo: "",
          fileName: "",
        })
        this.updateForm.patchValue({
          image: null,
          fileName: null,
        })
        if (this.banner != undefined) {
          this.banner.logo = "";
          this.banner.fileName = "";
        }
      })
    }
    if (id != null) {
      this.apiService.removeBannerLogo(name, id,).subscribe(res => {
      }, err => {

      }, () => {
        this.getBanners();
        this.updateForm.patchValue({
          image: "",
          fileName: ""
        })
        this.banner.image = "";
        this.banner.fileName = "";
      })
    }
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;
    this.apiService.updateBanner(this.banner.id, this.updateForm.value).subscribe(res => {
    },
      err => {

      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Banner yeniləndi");
        this.createForm.reset();
        this.submitted = false;
        this.getBanners();
      })
  }
  public updateBanner(banner: IBanner) {
    this.banner = banner;
    this.updateForm.patchValue({
      title: banner["title"],
      subtitle: banner["subtitle"],
      text: banner["text"],
      image: banner["image"],
      fileName: banner["fileName"],
      isBigBanner: banner["isBigBanner"],
      isMediumBanner: banner["isMediumBanner"],
      isSmallBanner: banner["isSmallBanner"],
      softDeleted: banner["softDeleted"]
    })
  }
  public removeBanner($event, id: any) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeBanner(id).subscribe(res => {
      }, err => {

      }, () => {
        this.notifier.notify("error", "Banner deaktiv edildi")
        this.getBanners();

      })
    }
  }

}
