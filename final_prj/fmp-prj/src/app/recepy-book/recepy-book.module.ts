import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecepyBookPage } from './recepy-book.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RecepyBookPageRoutingModule } from './recepy-book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    RecepyBookPageRoutingModule
  ],
  declarations: [RecepyBookPage]
})
export class RecepyBookPageModule {}
