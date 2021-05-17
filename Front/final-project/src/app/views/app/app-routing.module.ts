import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
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
      { path: '', component: HomeComponent, data: { title: 'Infixvuci' } },
      { path: 'about', component: AboutComponent },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard], data: { title: 'Hesab' } },
      { path: 'cart', component: CartComponent, data: { title: 'Səbət' } },
      { path: 'category/:id', component: CategoriesComponent, data: { title: 'Kateqoriya' } },
      { path: 'checkout', component: CheckoutComponent, data: { title: 'Sifariş' } },
      { path: 'contact', component: ContactComponent, data: { title: 'Əlaqə' } },
      { path: 'faq', component: FaqComponent },
      { path: 'hot-deals', component: HotDealsComponent, data: { title: 'Ən Yaxşı Təklif' } },
      { path: 'new-arrivals', component: NewArrivalsComponent, data: { title: 'Yeni Gələnlər' } },
      { path: 'product/:id', component: ShopDetailsComponent, data: { title: 'Məhsul' } },
      { path: 'trending', component: TrendingComponent, data: { title: 'Trend' } },
      { path: 'wishlist', component: WishlistComponent, data: { title: 'Sevimlilər' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
