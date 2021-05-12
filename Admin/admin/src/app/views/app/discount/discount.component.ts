import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IDiscount } from 'src/app/shared/models/discount.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public page: number = 1;
  public discounts: IDiscount[] = [];
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public discount: IDiscount;
  public discountId: any;
  public submitted = false;
  constructor(private apiService: ApiService,
    private notifier: NotifierService,
    private fb: FormBuilder,
    private element: ElementRef) { }

  ngOnInit(): void {
    this.getDiscounts();
    this.generateCreateForm();
    this.generateUpdateForm();
  }
  private getDiscounts(): void {
    this.apiService.getDiscounts().subscribe(res => {
      this.discounts = res.discounts;
    })
  }

  get f() {
    return this.createForm.controls;
  }
  get u() {
    return this.updateForm.controls;
  }
  generateCreateForm() {
    this.createForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      precentage: ["", [Validators.required]],
    })
  }
  generateUpdateForm() {
    this.updateForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      precentage: ["", [Validators.required]],
      softDeleted: [""],
    })
  }

  public updateDiscount(discount: IDiscount) {
    this.discountId = discount.id;
    this.discount = discount;
    this.updateForm.patchValue({
      name: discount['name'],
      startDate: discount["startDate"],
      endDate: discount["endDate"],
      precentage: discount["precentage"],
      softDeleted: discount["softDeleted"]
    })
  }
  public removeDiscount($event, id: number) {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeDiscount(id).subscribe(res => {
      }, err => {

      }, () => {
        this.notifier.notify("error", "Endirim deaktiv edildi")
        this.getDiscounts();
      })
    }
  }

  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createDiscount(this.createForm.value).subscribe(res => {

    },
      err => { },
      () => {
        this.submitted = false;
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Endirim yaradıldı");
        this.createForm.reset();
        this.getDiscounts();
      })

  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;
    this.apiService.updateDiscount(this.discountId, this.updateForm.value).subscribe(res => {

    },
      err => { },
      () => {
        this.submitted = false;
        this.element.nativeElement.querySelector(".close-update").click();
        this.notifier.notify("success", "Endirim yeniləndi");
        this.updateForm.reset();
        this.getDiscounts();
      })
  }

}
