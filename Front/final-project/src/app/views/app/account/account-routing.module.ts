import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountComponent } from './account.component';
import { AdressComponent } from './adress/adress.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent,
  },
  { path: 'details', component: AccountDetailsComponent },
  { path: 'adress', component: AdressComponent },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
