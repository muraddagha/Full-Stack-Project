import { Component, OnInit } from '@angular/core';
import { IUserOrderList } from '../../models/user-order-list.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public userOrderList: IUserOrderList[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOrderLists();
  }

  private getOrderLists(): void {
    this.apiService.getUserOrderLists().subscribe(res => {
      this.userOrderList = res.userOrderLists;
    })
  }

}
