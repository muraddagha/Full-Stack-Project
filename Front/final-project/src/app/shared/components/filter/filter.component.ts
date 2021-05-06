import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Options } from 'ng5-slider';
import { IBrand } from '../../models/brand.model';
import { IDepartment } from '../../models/department.model';
import { IProduct } from '../../models/product/product.model';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  star = faStar;
  minValue: number = 75;
  maxValue: number = 3500;
  options: Options = {
    floor: 0,
    ceil: 6000
  };
  public filterForm: FormGroup
  public departments: IDepartment[] = [];
  public brands: IBrand[] = [];
  @Output() productsByDepartment: IProduct[] = [];

  constructor(private elem: ElementRef,
    private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getBrands();
    this.generateForm();
  }
  generateForm(): void {
    this.filterForm = this.fb.group({
      department: [""],
      brand: [""]
    })
  }

  public filterByDepartmentId(id: any) {
    this.apiService.getProductsByDepartmentId(id).subscribe(res => {
      this.productsByDepartment = res.products;
    })
  }
  private getDepartments(): void {
    this.apiService.getDepartmentsWithCategory().subscribe(res => {
      this.departments = res.departments;
    })
  }
  private getBrands(): void {
    this.apiService.getBrands(10).subscribe(res => {
      this.brands = res.brands;
    })
  }
  public filter() {
    console.log(this.filterForm.value);

  }

}
