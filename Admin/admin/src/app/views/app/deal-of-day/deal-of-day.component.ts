import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { IDealOfDay } from 'src/app/shared/models/deal-of-day.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.component.html',
  styleUrls: ['./deal-of-day.component.scss']
})
export class DealOfDayComponent implements OnInit {
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public submitted = false;
  public page = 1;
  public dealOfDays: any[] = [];
  public products: IProduct[] = [];
  private dealId;
  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private element: ElementRef) { }

  ngOnInit(): void {
    this.getDealOfDays();
    this.getProducts();
    this.generateCreateForm();
    this.generateUpdateForm();
  }

  private getProducts(): void {
    this.apiService.getProducts().subscribe(res => {
      this.products = res.products;
    })
  }
  private getDealOfDays(): void {
    this.apiService.getDealOfDays().subscribe(res => {
      this.dealOfDays = res.dealOfDays;
    })
  }

  generateCreateForm() {
    this.createForm = this.fb.group({
      productId: ["", [Validators.required]],
      subtitle: ["", [Validators.maxLength(100)]],
      title: ["", [Validators.required, Validators.maxLength(200)]],
      backgroundColor: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  generateUpdateForm() {
    this.updateForm = this.fb.group({
      productId: ["", [Validators.required]],
      subtitle: ["", [Validators.maxLength(100)]],
      title: ["", [Validators.required, Validators.maxLength(200)]],
      backgroundColor: ["", [Validators.required, Validators.maxLength(50)]],
      softDeleted: [""]
    })
  }

  get f() {
    return this.createForm.controls;
  }
  get u() {
    return this.updateForm.controls;
  }

  public updateDeal(item: IDealOfDay): void {
    this.dealId = item.id;
    this.updateForm.patchValue({
      productId: item.product.id,
      subtitle: item["subtitle"],
      title: item["title"],
      backgroundColor: item["backgroundColor"],
      softDeleted: item["softDeleted"]
    })
  }

  public create(): void {
    this.submitted = true;
    if (this.createForm.invalid) return;
    this.apiService.createDealOfDay(this.createForm.value).subscribe(res => {
      console.log(res);
    }, err => { },
      () => {
        this.element.nativeElement.querySelector(".close-create").click();
        this.notifier.notify("success", "Əlavə edildi")
        this.getDealOfDays();
        this.submitted = false;
        this.createForm.reset();
      })
  }
  public update(): void {
    this.submitted = true;
    if (this.updateForm.invalid) return;
    this.apiService.updateDealOfDay(this.dealId, this.updateForm.value).subscribe(res => {
    }, err => { },
      () => {
        this.element.nativeElement.querySelector(".close-update").click();
        this.submitted = false;
        this.notifier.notify("success", "Yeniləndi");
        this.updateForm.reset();
        this.getDealOfDays();
      })
  }
  public removeDeal($event, id): void {
    $event.preventDefault();
    if (confirm("Əminsinizmi?")) {
      this.apiService.removeDealOfDay(id).subscribe(res => {

      }, err => { },
        () => {
          this.notifier.notify("error", "Deaktiv edildi")
          this.getDealOfDays();
        })
    }
  }
}
