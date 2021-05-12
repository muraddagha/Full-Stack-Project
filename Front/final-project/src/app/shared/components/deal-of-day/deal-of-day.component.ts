import { Component, OnInit } from '@angular/core';
import { IDealOfDay } from '../../models/deal-of-deay.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.component.html',
  styleUrls: ['./deal-of-day.component.scss']
})
export class DealOfDayComponent implements OnInit {

  public dealOfDay: IDealOfDay;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDealOfDay();
  }

  private getDealOfDay(): void {
    this.apiService.getDealOfDay().subscribe(res => {
      this.dealOfDay = res;
    })
  }

}
