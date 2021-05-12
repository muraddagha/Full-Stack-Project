import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealOfDayComponent } from './deal-of-day/deal-of-day.component';
import { DepartmentComponent } from './department/department.component';
import { DiscountComponent } from './discount/discount.component';
import { SettingsComponent } from './settings/settings.component';
import { ShopCollectionComponent } from './shop-collection/shop-collection.component';
import { SocialLinksComponent } from './social-links/social-links.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'shop-collection', component: ShopCollectionComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'deal-of-day', component: DealOfDayComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'social-links', component: SocialLinksComponent },
      { path: 'discount', component: DiscountComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
