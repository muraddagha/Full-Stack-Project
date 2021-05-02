import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AdressComponent } from './adress/adress.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContainersModule } from 'src/app/shared/containers/containers.module';


@NgModule({
  declarations: [
    AccountComponent,
    AdressComponent,
    AccountDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ComponentsModule,
    ContainersModule
  ]
})
export class AccountModule { }
