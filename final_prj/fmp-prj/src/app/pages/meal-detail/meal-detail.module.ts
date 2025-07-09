import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealDetailPageRoutingModule } from './meal-detail-routing.module';

import { MealDetailPage } from './meal-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [MealDetailPage]
})
export class MealDetailPageModule {}
