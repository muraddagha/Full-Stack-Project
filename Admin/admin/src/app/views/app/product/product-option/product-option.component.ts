import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IProductOptionItem } from 'src/app/shared/models/product/product-option-item.model';
import { IOption } from 'src/app/shared/models/product/product-option.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.scss']
})
export class ProductOptionComponent implements OnInit {

  public options: IOption[] = [];
  public createOptionForm: FormGroup;
  public createOptionItemForm: FormGroup;
  public updateOptionForm: FormGroup;
  public updateOptionItemForm: FormGroup;
  public submitted: boolean = false;
  public submittedItem: boolean = false;
  public upOptionSubmitted: boolean = false;
  public upItemSubmitted: boolean = false;
  private id = this.activeRoute.snapshot.paramMap.get("id")
  public optionId;
  public optionItemId;
  constructor(private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) {
    this.getOptions();

  }

  ngOnInit(): void {
    this.generateOptionForm();
    this.generateOptionItemForm();
    this.generateUpdateOption();
    this.generateUpdateOptionItem();
  }
  getOptions(): void {
    this.apiService.getProductOptions(this.id).subscribe(res => {
      this.options = res.options;
    })
  }
  get f() {
    return this.createOptionForm.controls
  }
  get u() {
    return this.createOptionItemForm.controls
  }
  get updateOptionF() {
    return this.updateOptionForm.controls
  }
  get updateItemF() {
    return this.updateOptionItemForm.controls
  }
  generateOptionForm() {
    this.createOptionForm = this.fb.group({
      productId: this.id,
      title: ["", [Validators.required]],
      type: ["0"]
    })
  }
  generateOptionItemForm() {
    this.createOptionItemForm = this.fb.group({
      productOptionId: ["", Validators.required],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      value: ["", [Validators.required, Validators.maxLength(50)]]
    })
  }
  generateUpdateOption() {
    this.updateOptionForm = this.fb.group({
      title: ["", [Validators.required]],
      type: ["0"]
    })
  }
  generateUpdateOptionItem() {
    this.updateOptionItemForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      value: ["", [Validators.required, Validators.maxLength(50)]]
    })
  }

  public updateOptionValue(option: IOption) {
    this.optionId = option.id;
    this.updateOptionForm.patchValue({
      title: option['title'],
      type: option["type"],
    })
  }
  public updateOptionItemValue(optionItem: IProductOptionItem) {
    this.optionItemId = optionItem.id;
    this.updateOptionItemForm.patchValue({
      name: optionItem["name"],
      value: optionItem["value"],
    })
  }
  public createOption(): void {
    this.submitted = true;
    if (this.createOptionForm.invalid) return;
    this.apiService.createOption(this.createOptionForm.value).subscribe(res => {
    }, err => {

    }, () => {
      this.notifier.notify("success", "Seçim yaradıldı")
      this.submitted = false;
      this.createOptionItemForm.reset();
      this.generateOptionForm();
      this.getOptions();
    })
  }
  public updateOption(): void {
    this.upOptionSubmitted = true;
    if (this.updateOptionForm.invalid) return;
    this.apiService.UpdateOption(this.optionId, this.updateOptionForm.value).subscribe(res => {
    }, err => {

    },
      () => {
        this.notifier.notify("success", "Seçim yeniləndi");
        this.getOptions();
        this.element.nativeElement.querySelector(".close-update-option").click();
      })
  }
  public createOptionItem(): void {
    this.submittedItem = true;
    if (this.createOptionItemForm.invalid) return;
    this.apiService.createOptionItem(this.createOptionItemForm.value).subscribe(res => {
    }, err => {

    }, () => {
      this.notifier.notify("success", "Dəyər yaradıldı")
      this.submittedItem = false;
      this.createOptionItemForm.reset();
      this.generateOptionItemForm();
      this.getOptions();
    })
  }
  public updateOptionItem(): void {
    this.upItemSubmitted = true;
    if (this.updateOptionItemForm.invalid) return;
    this.apiService.UpdateOptionItem(this.updateOptionItemForm.value, this.optionItemId,).subscribe(res => {
    }, err => {

    },
      () => {
        this.notifier.notify("success", "Dəyər yeniləndi");
        this.getOptions();
        this.element.nativeElement.querySelector(".close-update-item").click();
      })
  }
  public removeOption($event, id) {
    $event.preventDefault();
    if (confirm("Əminsiniz?")) {
      this.apiService.RemoveOption(id).subscribe(res => {

      }, err => {

      },
        () => {
          this.notifier.notify("error", "Seçim silindi");
          this.getOptions();
        })
    }
  }
  public removeOptionItem($event, id) {
    $event.preventDefault();
    if (confirm("Əminsiniz?")) {
      this.apiService.RemoveOptionItem(id).subscribe(res => {

      }, err => {

      },
        () => {
          this.notifier.notify("error", "Dəyər silindi")
          this.getOptions();
        })
    }
  }
}
