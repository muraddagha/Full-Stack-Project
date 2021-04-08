import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AdressComponent } from './adress/adress.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountDetailsComponent } from './account-details/account-details.component';


@NgModule({
  declarations: [
    AccountComponent,
    AdressComponent,
    OrdersComponent,
    AccountDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
