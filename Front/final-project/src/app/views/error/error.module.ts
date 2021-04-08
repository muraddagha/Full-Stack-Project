import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutModule } from 'src/app/shared/containers/layout/layout.module';


@NgModule({
  declarations: [
    ErrorComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    LayoutModule
  ]
})
export class ErrorModule { }
