import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event, NavigationStart, ActivationEnd, ActivationStart } from '@angular/router';
import { IUserOrderList } from 'src/app/shared/models/user-order-list.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderList: IUserOrderList;
  public pendingOrders: IUserOrderList[] = [];
  public recivedOrders: IUserOrderList[] = [];
  constructor(private apiSerivce: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationStart) {

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.getOrderListById();
      }
    });
  }

  ngOnInit(): void {
    this.getOrderListById();
    this.getPendingOrders();
    this.getRecivedOrders();
  }

  getOrderListById(): void {
    let id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiSerivce.getUserOrderListById(id).subscribe(res => {
      this.orderList = res;
    })
  }

  getPendingOrders(): void {
    this.apiSerivce.getUserOrderListByStatus(0).subscribe(res => {
      this.pendingOrders = res.userOrderLists;
    })
  }

  getRecivedOrders(): void {
    this.apiSerivce.getUserOrderListByStatus(1).subscribe(res => {
      this.recivedOrders = res.userOrderLists;
    })
  }

}
