import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ISetting } from 'src/app/shared/models/setting.model';
import { IUploadImage } from 'src/app/shared/models/upload-image.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public submitted: boolean = false;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public settings: ISetting[] = [];
  public setting: ISetting;
  private settingId: any;
  public uploadImg: IUploadImage[] = [];
  public page = 1;

  constructor(private notifier: NotifierService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private element: ElementRef) { }

  ngOnInit(): void {
    this.getSettings();
    this.generateCreateForm();
    this.generateUpdateForm();
  }

  generateCreateForm(): void {
    this.createForm = this.fb.group({
      adress: ["", [Validators.maxLength(100)]],
      phone: ["", [Validators.maxLength(50)]],
      email: ["", [Validators.maxLength(50)]],
      logo: ["", [Validators.maxLength(200)]],
      fileName: ["", [Validators.maxLength(200)]],
    })
  }
  generateUpdateForm(): void {
    this.updateForm = this.fb.group({
      adress: ["", [Validators.maxLength(100)]],
      phone: ["", [Validators.maxLength(50)]],
      email: ["", [Validators.maxLength(50)]],
      logo: ["", [Validators.maxLength(200)]],
      fileName: ["", [Validators.maxLength(200)]],
      softDeleted: [""]
    })
  }
  get f() {
    return this.createForm.controls;
  }
  get u() {
    return this.updateForm.controls;
  }
  public getSettings(): void {
    this.apiService.getSettings().subscribe(res => {
      this.settings = res.settings;
    })
  }
  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createSetting(this.createForm.value).subscribe(res => {

    }, err => { },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.uploadImg = [];
        this.submitted = true;
        this.notifier.notify("success", "Parametr yaradıldı");
        this.createForm.reset();
        this.getSettings();
      })
  }
  private uploadPhoto(data: any): void {
    this.apiService.uploadPhoto(data).subscribe(res => {
      this.uploadImg.push(res);
      if (this.setting != undefined) {
        this.setting.logo = res.src;
        this.setting.fileName = res.fileName;
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
      if (this.setting != undefined) {
        this.setting.logo = null;
        this.setting.fileName = null;
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
  public removeLogo($event, setting: ISetting) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeSettingLogo(setting.fileName, setting.id,).subscribe(res => {
      }, err => {

      }, () => {
        this.getSettings();
        this.updateForm.patchValue({
          logo: null,
          fileName: null
        })
        this.setting.logo = null;
        this.setting.fileName = null;
      })
    }
  }
  public removeSetting($event, id: string) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeSetting(id).subscribe(res => {

      }, err => { },
        () => {
          this.notifier.notify("success", "Deaktiv edildi");
          this.getSettings();
        })
    }
  }
  public updateSetting(setting: ISetting) {
    this.settingId = setting.id;
    this.setting = setting;
    this.updateForm.patchValue({
      adress: setting["adress"],
      phone: setting["phone"],
      email: setting["email"],
      logo: setting["logo"],
      fileName: setting["fileName"],
      softDeleted: setting["softDeleted"]
    })
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;
    this.apiService.updateSetting(this.settingId, this.updateForm.value).subscribe(res => {
    },
      err => {
      },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.uploadImg = [];
        this.notifier.notify("success", "Parametr yeniləndi")
        this.getSettings();
        this.submitted = false;
        this.updateForm.reset();
      })
  }

}
