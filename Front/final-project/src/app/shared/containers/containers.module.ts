import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArrivalsContainerComponent } from './new-arrivals-container/new-arrivals-container.component';
import { ComponentsModule } from '../components/components.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsSliderContainerComponent } from './products-slider-container/products-slider-container.component';
import { TopBrandsContainerComponent } from './top-brands-container/top-brands-container.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';





@NgModule({
  declarations: [
    NewArrivalsContainerComponent,
    ProductsSliderContainerComponent,
    TopBrandsContainerComponent,
    ProductListContainerComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule

  ],
  exports: [
    NewArrivalsContainerComponent,
    ProductsSliderContainerComponent,
    TopBrandsContainerComponent,
    ProductListContainerComponent
  ]
})
export class ContainersModule { }
