import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecepyBookPage } from './recepy-book.page';

import { RecepyBookPageRoutingModule } from './recepy-book-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepyBookPageRoutingModule,
    SharedModule
  ],
  declarations: [RecepyBookPage]
})
export class RecepyBookPageModule {}
