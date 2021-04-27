import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'src/app/shared/containers/layout/layout.module';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { TrendingComponent } from './trending/trending.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContainersModule } from 'src/app/shared/containers/containers.module';
import { TotalPricePipe } from 'src/app/shared/pipes/total-price.pipe';
import { TotalProductPricePipe } from 'src/app/shared/pipes/total-product-price.pipe';



@NgModule({
  providers: [TotalPricePipe,
    TotalProductPricePipe,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    CartComponent,
    CheckoutComponent,
    ShopDetailsComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    TrendingComponent,
    HotDealsComponent,
    NewArrivalsComponent,
    WishlistComponent,
    TotalPricePipe,
    TotalProductPricePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    CarouselModule,
    ComponentsModule,
    ContainersModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ]
})
export class AppModule { }
