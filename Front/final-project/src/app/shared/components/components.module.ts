import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product/single-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';
import { OfferComponent } from './offer/offer.component';
import { BlogComponent } from './blog/blog.component';
import { SubscribeBannerComponent } from './subscribe-banner/subscribe-banner.component';
import { AdsBannerComponent } from './ads-banner/ads-banner.component';



@NgModule({
  declarations: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent,
    BlogComponent,
    SubscribeBannerComponent,
    AdsBannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent,
    BlogComponent,
    SubscribeBannerComponent,
    AdsBannerComponent
  ]
})
export class ComponentsModule { }
