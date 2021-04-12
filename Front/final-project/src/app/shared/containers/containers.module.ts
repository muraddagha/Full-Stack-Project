import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArrivalsContainerComponent } from './new-arrivals-container/new-arrivals-container.component';
import { ComponentsModule } from '../components/components.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsSliderContainerComponent } from './products-slider-container/products-slider-container.component';
import { TopBrandsContainerComponent } from './top-brands-container/top-brands-container.component';



@NgModule({
  declarations: [
    NewArrivalsContainerComponent,
    ProductsSliderContainerComponent,
    TopBrandsContainerComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    FontAwesomeModule
  ],
  exports: [
    NewArrivalsContainerComponent,
    ProductsSliderContainerComponent,
    TopBrandsContainerComponent,
  ]
})
export class ContainersModule { }
