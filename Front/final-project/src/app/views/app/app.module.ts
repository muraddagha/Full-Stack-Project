import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
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
    WishlistComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule
  ]
})
export class AppModule { }
