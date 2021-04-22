import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from 'src/app/shared/containers/layout/layout.module';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ShopCollectionComponent } from './shop-collection/shop-collection.component';
import { BrandComponent } from './brand/brand.component';
import { DealOfDayComponent } from './deal-of-day/deal-of-day.component';
import { SettingsComponent } from './settings/settings.component';
import { SocialLinksComponent } from './social-links/social-links.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DepartmentComponent,
    CategoryComponent,
    ProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ShopCollectionComponent,
    BrandComponent,
    DealOfDayComponent,
    SettingsComponent,
    SocialLinksComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class AppModule { }
