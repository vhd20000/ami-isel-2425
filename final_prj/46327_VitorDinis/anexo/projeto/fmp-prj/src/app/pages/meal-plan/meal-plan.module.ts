import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealPlanPage } from './meal-plan.page';

import { MealPlanPageRoutingModule } from './meal-plan-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealPlanPageRoutingModule,
    SharedModule
],
  declarations: [MealPlanPage]
})
export class MealPlanPageModule {}
