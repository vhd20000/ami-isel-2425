import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListPage } from './shopping-list.page';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';

import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ShoppingListPageRoutingModule
  ],
  declarations: [ShoppingListPage]
})
export class ShoppingListPageModule {}
