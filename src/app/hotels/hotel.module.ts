import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelRoutingModule } from '../hotel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';



@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailComponent,
    HotelEditComponent
  ],
  imports: [
    HotelRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HotelModule { }
