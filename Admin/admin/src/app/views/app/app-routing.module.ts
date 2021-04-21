import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { ProductComponent } from './product/product.component';
import { ShopCollectionComponent } from './shop-collection/shop-collection.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'shop-collection', component: ShopCollectionComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
