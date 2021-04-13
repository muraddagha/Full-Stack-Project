import { Component, ElementRef, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  star = faStar;
  minValue: number = 75;
  maxValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 500
  };

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

}
