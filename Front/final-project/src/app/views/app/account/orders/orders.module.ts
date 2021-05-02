import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContainersModule } from 'src/app/shared/containers/containers.module';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,

  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ComponentsModule,
    ContainersModule
  ]
})
export class OrdersModule { }
