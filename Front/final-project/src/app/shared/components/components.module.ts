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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { BasketComponent } from './basket/basket.component';
import { OrderListComponent } from './order-list/order-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { DealOfDayComponent } from './deal-of-day/deal-of-day.component';
import { DiscountPricePipe } from '../pipes/discount-price.pipe';
import { PipesModule } from '../pipes/pipes.module';



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
    OrderListComponent,
    WishlistComponent,
    DealOfDayComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
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
    BasketComponent,
    OrderListComponent,
    WishlistComponent,
    DealOfDayComponent
  ]
})
export class ComponentsModule { }
