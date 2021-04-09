import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArrivalsContainerComponent } from './new-arrivals-container/new-arrivals-container.component';
import { ComponentsModule } from '../components/components.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NewArrivalsContainerComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    FontAwesomeModule
  ],
  exports: [
    NewArrivalsContainerComponent
  ]
})
export class ContainersModule { }
