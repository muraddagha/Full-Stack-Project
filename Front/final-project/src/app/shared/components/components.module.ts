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
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FilterComponent } from './filter/filter.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { BasketComponent } from './basket/basket.component';



@NgModule({
  declarations: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent,
    BlogComponent,
    SubscribeBannerComponent,
    AdsBannerComponent,
    BreadcrumbComponent,
    FilterComponent,
    PaginationComponent,
    SearchBoxComponent,
    BasketComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    Ng5SliderModule,
    FormsModule
  ],
  exports: [
    SingleProductComponent,
    CountdownComponent,
    OfferComponent,
    BlogComponent,
    SubscribeBannerComponent,
    AdsBannerComponent,
    BreadcrumbComponent,
    FilterComponent,
    PaginationComponent,
    SearchBoxComponent,
    BasketComponent
  ]
})
export class ComponentsModule { }
