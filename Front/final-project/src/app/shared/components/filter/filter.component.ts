import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Options } from 'ng5-slider';
import { BehaviorSubject } from 'rxjs';
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
  public brandsValue: number[] = [];
  public departmentsValue: number[] = [];
  public otP: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);


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
    this.apiService.getFilteredProduct(this.departmentsValue, this.brandsValue, this.minValue, this.maxValue).subscribe(res => {
      this.otP.next(res.products)
    })
  }

  public departmentValue(id: any) {
    if (this.departmentsValue.find(i => i == id)) {
      this.departmentsValue = this.departmentsValue.filter(a => a != id)
    }
    else if (!this.departmentsValue.find(i => i == id)) {
      this.departmentsValue.push(id);
    }
  }

  public brandValue(id: any) {
    if (this.brandsValue.find(i => i == id)) {
      this.brandsValue = this.brandsValue.filter(i => i != id)
    }
    else if (!this.brandsValue.find(i => i == id)) {
      this.brandsValue.push(id);
    }
  }

}
