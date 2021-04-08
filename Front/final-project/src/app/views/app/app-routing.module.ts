import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { TrendingComponent } from './trending/trending.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
      { path: 'cart', component: CartComponent },
      { path: 'category/:id', component: CategoriesComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'hot-deals', component: HotDealsComponent },
      { path: 'new-arrivals', component: NewArrivalsComponent },
      { path: 'product/:id', component: ShopDetailsComponent },
      { path: 'trending', component: TrendingComponent },
      { path: 'wishlist', component: WishlistComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
