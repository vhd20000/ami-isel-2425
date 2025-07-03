import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GroupsPageRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    GroupsPageRoutingModule
  ],
  declarations: [GroupsPage]
})
export class GroupsPageModule {}
