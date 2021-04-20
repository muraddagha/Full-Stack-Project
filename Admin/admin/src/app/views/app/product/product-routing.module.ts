import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductOptionComponent } from './product-option/product-option.component';
import { ProductComponent } from './product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  { path: "", component: ProductComponent },
  { path: "create-product", component: CreateProductComponent },
  { path: "update-product/:id", component: UpdateProductComponent },
  { path: "option-product/:id", component: ProductOptionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
