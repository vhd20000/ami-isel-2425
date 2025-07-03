import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealPlanPage } from './meal-plan.page';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';

import { MealPlanPageRoutingModule } from './meal-plan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    MealPlanPageRoutingModule
  ],
  declarations: [MealPlanPage]
})
export class MealPlanPageModule {}
