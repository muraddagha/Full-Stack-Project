import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '', component: OrdersComponent,
  },
  { path: 'details/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
