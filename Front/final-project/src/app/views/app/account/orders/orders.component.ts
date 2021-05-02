import { Component, OnInit } from '@angular/core';
import { IUserOrderList } from 'src/app/shared/models/user-order-list.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
