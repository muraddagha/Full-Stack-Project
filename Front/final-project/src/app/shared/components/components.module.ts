import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product/single-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';
import { OfferComponent } from './offer/offer.component';



@NgModule({
  declarations: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent
  ]
})
export class ComponentsModule { }
